import React, {PureComponent, ReactNode} from 'react';

import {AppLoadingView} from '../../views/AppLoadingView';
import {AppCrashView} from '../../views/AppCrashView';
import {App} from '../App';
import {GlobalStyleSheet} from '../GlobalStyleSheet';
import {ModalRoot} from '../../ui/ModalRoot';
import {Router} from 'vkma-router';
import {ServicePanel} from '../../misc/ServicePanel';
import {
  DeviceProvider,
  ThemeProvider,
  ApolloProvider,
  ConfigProvider,
  VKStorageProvider,
} from '../../providers';
import {Provider as StoreProvider, ReactReduxContext} from 'react-redux';

import {createReduxStore} from '../../../redux';
import {appRootContext, AppRootContext} from './context';
import vkBridge, {VKBridgeSubscribeHandler} from '@vkontakte/vk-bridge';
import {prepareUpdateStatePayload} from './utils';
import {getStorageKeys} from '../../../utils';
import {routingTree} from '../../../trees';

import {AppRootProps, AppRootState} from './types';
import {StorageFieldEnum, StorageValuesMap} from '../../../types';

const {Provider: AppRootProvider} = appRootContext;

// Assign human-readable store provider name for debugging purposes
ReactReduxContext.displayName = 'StoreProvider';

/**
 * Root application component. Everything application requires for showing
 * first screen is being loaded here.
 */
export class AppRoot extends PureComponent<AppRootProps, AppRootState> {
  /**
   * True if first app config was received
   * @type {boolean}
   */
  private isConfigReceived = false;

  /**
   * Application root context
   * @type {{init: () => Promise<void>}}
   */
  private appRootContext: AppRootContext = {init: this.init.bind(this)};

  public constructor(props: Readonly<AppRootProps>) {
    super(props);
    const {insets} = props;

    this.state = {
      loading: true,
      error: null,
      store: createReduxStore(),
      insets: insets || undefined,
    };
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
    const {
      loading, error, insets, currentInsets, scheme, appearance,
      config: appConfig, store,
    } = this.state;
    const {history, os, envConfig, launchParams} = this.props;
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
      content = <App/>;
    }

    return (
      <StoreProvider store={store}>
        <AppRootProvider value={this.appRootContext}>
          <VKStorageProvider>
            <DeviceProvider
              defaultOS={os}
              insets={insets}
              currentInsets={currentInsets}
            >
              <ConfigProvider
                appConfig={appConfig}
                envConfig={envConfig}
                launchParams={launchParams}
              >
                <ApolloProvider>
                  <ThemeProvider scheme={scheme} appearance={appearance}>
                    <Router
                      initialHistory={history}
                      tree={routingTree}
                      validate={true}
                    >
                      <GlobalStyleSheet/>
                      <ModalRoot>
                        {content}
                        <ServicePanel/>
                      </ModalRoot>
                    </Router>
                  </ThemeProvider>
                </ApolloProvider>
              </ConfigProvider>
            </DeviceProvider>
          </VKStorageProvider>
        </AppRootProvider>
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
      const updateStatePayload = prepareUpdateStatePayload(
        config, this.isConfigReceived,
      );

      if (!this.isConfigReceived) {
        this.isConfigReceived = true;
      }

      // If state update is required, call it
      if (updateStatePayload) {
        // FIXME: "any" is a fix in this way due to setState uses undefined
        //  values as usual. "Partial" states that values can be missing or
        //  equal to undefined, but "setState" requires picked props from
        //  State. It means, update props types  must be equal to props types
        //  in state. Looks like some misstyping in React
        this.setState(updateStatePayload as any);
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
      const [storage] = await Promise.all([
        getStorageKeys<StorageValuesMap>(...Object.values(StorageFieldEnum))
      ]);

      // this.setState({loading: false, storage: {}});
      this.setState({loading: false, storage});
    } catch (e) {
      // In case error appears, catch it and display
      this.setState({error: e.message, loading: false});
    }
  }
}
