import React, {PureComponent, ReactNode} from 'react';

import {AppLoadingView} from '../views/AppLoadingView';
import {AppCrashView} from '../views/AppCrashView';
import {App} from '../App';
import {Provider as StoreProvider} from 'react-redux';
import {ThemeProvider} from '../ThemeProvider';
import {RootContextProvider, RootContext} from '../RootContextProvider';
import {ServicePanel} from '../ServicePanel';
import {ModalRoot} from '../ModalRoot';
import {ApolloProvider} from '@apollo/react-hooks';

import createReduxStore from '../../redux';
import vkBridge, {
  UpdateConfigData,
  VKBridgeSubscribeHandler,
} from '@vkontakte/vk-bridge';
import {configActions, ConfigReducerState} from '../../redux/reducers/config';
import {getStorage} from '../../utils/storage';
import {getLaunchParams} from '../../utils/launch-params';
import {createApolloClient} from './utils';
import config from '../../config';

import {Store} from 'redux';
import {ReduxState} from '../../redux/types';
import {getInsets} from '../../utils/dom';

interface State {
  loading: boolean;
  error: string | null;
  store: Store<ReduxState>;
}

/**
 * Root application component. Everything application requires for showing
 * first screen is being loaded here.
 */
export class Root extends PureComponent<{}, State> {
  public state: Readonly<State> = {
    loading: true,
    error: null,
    store: createReduxStore(),
  };

  /**
   * Contains application config sent by bridge while redux store was not
   * created yet
   * @type {null}
   */
  private initialAppConfig: UpdateConfigData | null = null;

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
  private apolloClient = createApolloClient({
    httpURI: config.gqlHttpUrl,
    wsURI: config.gqlWsUrl,
    launchParams: window.location.search.slice(1),
  });

  public componentDidMount() {
    // When component did mount, we are waiting for application config from
    // bridge and add event listener
    vkBridge.subscribe(this.onVKBridgeEvent);

    // Notify native application, initiazliation done. It will make native
    // application hide loader and display this application.
    vkBridge.send('VKWebAppInit');

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
    const {loading, error, store} = this.state;
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
      <StoreProvider store={store}>
        <RootContextProvider value={this.rootContextValue}>
          <ThemeProvider>
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
    const {store} = this.state;

    if (event.detail && event.detail.type === 'VKWebAppUpdateConfig') {
      if (store) {
        store.dispatch(configActions.updateConfig(event.detail.data));
      } else {
        this.initialAppConfig = event.detail.data;
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

      let appConfig: ConfigReducerState = {
        app: 'vkclient',
        appConfig: config,
        appId: '',
        appearance: 'light',
        scheme: 'client_light',
        insets: {top: 0, left: 0, right: 0, bottom: 0},
        startTime: 0,
        viewportHeight: 0,
        viewportWidth: 0,
        launchParams: getLaunchParams(),
      };

      if (this.initialAppConfig) {
        appConfig = {...appConfig, ...this.initialAppConfig};
      }
      // Due to insets are not being sent in VKWebAppUpdateConfig (they are
      // all 0 there), we get real insets from CSS-environment
      appConfig.insets = getInsets();

      this.setState({
        store: createReduxStore({storage, config: appConfig}),
        loading: false,
      });
    } catch (e) {
      // In case error appears, catch it and display
      this.setState({error: e.message, loading: false});
    }
  }
}
