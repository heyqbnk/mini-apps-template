import React, {PureComponent, ReactNode} from 'react';

import {AppLoadingView} from '../views/AppLoadingView';
import {AppCrashView} from '../views/AppCrashView';
import {App} from '../App';
import {ApolloProvider} from '@apollo/react-hooks';
import {GlobalStyleSheet} from '../GlobalStyleSheet';
import {ModalRoot} from '../ModalRoot';
import {Provider as StoreProvider} from 'react-redux';
import {RootContextProvider, RootContext} from '../RootContextProvider';
import {ServicePanel} from '../ServicePanel';
import {ThemeProvider} from '../ThemeProvider';

import createReduxStore from '../../redux';
import vkBridge, {VKBridgeSubscribeHandler} from '@vkontakte/vk-bridge';
import {getStorage} from '../../utils/storage';
import {createApolloClient} from './utils';
import {deviceActions} from '../../redux/reducers/device';
import {appConfigActions} from '../../redux/reducers/app-config';

import {Store} from 'redux';
import {Config} from '../../config';
import {ReduxState} from '../../redux/types';
import {Insets, LaunchParams, OS} from '../../types';
import {ApolloClient} from 'apollo-client';

interface State {
  loading: boolean;
  error: string | null;
}

interface Props {
  /**
   * Environments-based config
   */
  config: Config;
  /**
   * Device operating system
   */
  os: OS;
  /**
   * Application launch parameters
   */
  launchParams: LaunchParams;
  /**
   * Device insets
   */
  insets: Insets;
}

/**
 * Root application component. Everything application requires for showing
 * first screen is being loaded here.
 */
export class Root extends PureComponent<Props, State> {
  /**
   * True if first app config was received
   * @type {boolean}
   */
  private isFirstConfigReceived = false;

  /**
   * Value for RootContext
   * @type {{init: () => Promise<void>}}
   */
  private rootContextValue: RootContext = {
    init: this.init.bind(this),
  };

  /**
   * ApolloClient used to send requests and create WebSocket connections
   * @type {ApolloClient<any>}
   */
  private readonly apolloClient: ApolloClient<any>;

  /**
   * Redux store
   */
  private store: Store<ReduxState>;

  public state: Readonly<State> = {
    loading: true,
    error: null,
  };

  public constructor(props: Readonly<Props>) {
    super(props);
    const {os, launchParams, insets, config} = props;

    // Create initial redux store
    this.store = createReduxStore({
      config,
      device: {insets, currentInsets: insets, os},
      launchParams,
    });

    // Convert params object to string
    const launchParamsAsString = Object.keys(launchParams)
      .reduce<string>((acc, key, idx) => {
        return acc
          + (idx === 0 ? '' : '&')
          + `${key}=${(launchParams as any)[key]}`;
      }, '');

    // Create Apollo client
    this.apolloClient = createApolloClient({
      httpURI: config.gqlHttpUrl,
      wsURI: config.gqlWsUrl,
      launchParams: launchParamsAsString,
    });
  }

  public componentDidMount() {
    // When component did mount, we are waiting for application config from
    // bridge and add event listener
    vkBridge.subscribe(this.onVKBridgeEvent);

    // Notify native application, initialization done. It will make native
    // application hide loader and display this application.
    vkBridge.send('VKWebAppInit');

    // Update device interface colors if required
    if (vkBridge.supports('VKWebAppSetViewSettings')) {
      vkBridge.send('VKWebAppSetViewSettings', {
        status_bar_style: 'light',
        action_bar_color: 'black',
        navigation_bar_color: 'white',
      });
    }

    // Init application
    this.init();
  }

  public componentDidCatch(error: Error) {
    // Catch error if it did not happen before
    this.setState({error: error.message});
  }

  public componentWillUnmount() {
    // When component unloads, remove all event listeners
    vkBridge.unsubscribe(this.onVKBridgeEvent);
  }

  public render() {
    const {loading, error} = this.state;
    let content: ReactNode = null;

    // Display loader
    if (loading) {
      content = <AppLoadingView/>;
    }
    // Display error
    else if (error) {
      content = (
        <AppCrashView onRestartClick={this.init.bind(this)} error={error}/>
      );
    }
    // Display application
    else {
      content = (
        <ApolloProvider client={this.apolloClient}>
          <ServicePanel/>
          <App/>
        </ApolloProvider>
      );
    }

    return (
      <StoreProvider store={this.store}>
        <RootContextProvider value={this.rootContextValue}>
          <ThemeProvider>
            <GlobalStyleSheet/>
            <ModalRoot>
              {content}
            </ModalRoot>
          </ThemeProvider>
        </RootContextProvider>
      </StoreProvider>
    );
  }

  /**
   * Checks if event is VKWebAppUpdateConfig to know application config
   * sent from bridge
   * @param {VKBridgeEvent<ReceiveMethodName>} event
   */
  private onVKBridgeEvent: VKBridgeSubscribeHandler = event => {
    if (event.detail && event.detail.type === 'VKWebAppUpdateConfig') {
      const config = event.detail.data;

      // If first config was already received, ignore new schema coming from
      // application
      if (this.isFirstConfigReceived) {
        if ('scheme' in config) {
          const {scheme, ...rest} = config;
          this.store.dispatch(appConfigActions.updateConfig(rest));
        } else {
          this.store.dispatch(appConfigActions.updateConfig(config));
        }
      } else {
        this.store.dispatch(appConfigActions.updateConfig(config));
        this.isFirstConfigReceived = true;
      }

      // Update current insets
      if ('insets' in config) {
        this.store.dispatch(deviceActions.setCurrentInsets(config.insets));
      }
    }
  };

  /**
   * Initializes application
   */
  private async init() {
    this.setState({loading: true, error: null});

    try {
      // Performing all async operations and getting data to launch application
      const [storage] = await Promise.all([getStorage()]);

      // Recreate redux store with received data
      this.store = createReduxStore({
        ...this.store.getState(),
        storage,
      });
      this.setState({loading: false});
    } catch (e) {
      // In case error appears, catch it and display
      this.setState({error: e.message, loading: false});
    }
  }
}
