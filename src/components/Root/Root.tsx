import React, {PureComponent} from 'react';

import AppLoadingView from '../AppLoadingView';
import App from '../App';
import {Provider as StoreProvider} from 'react-redux';
import ThemeProvider from '../ThemeProvider';
import AppCrashView from '../AppCrashView';

import createReduxStore from '../../redux';
import vkConnect, {VKConnectSubscribeHandler} from '@vkontakte/vk-connect';
import {appConfigActions} from '../../redux/reducers/app-config';
import {isUpdateConfigEvent, isUpdateInsetsEvent} from './utils';

import {Store} from 'redux';
import {IReduxState} from '../../redux/types';

interface IState {
  loading: boolean;
  error: string | null;
  store: Store<IReduxState> | null;
}

class Root extends PureComponent<{}, IState> {
  public state: Readonly<IState> = {
    loading: true,
    error: null,
    store: null,
  };

  /**
   * Initializes application.
   */
  private async init() {
    this.setState({loading: true, error: null});

    let error: string | null = null;
    let store: Store<IReduxState> | null = null;

    try {
      // Do all requests and operations required to launch application here and
      // then create redux store.
      store = createReduxStore();
    } catch (e) {
      const err = e as Error;
      error = err.message;
    }

    this.setState({store, error, loading: false});
  }

  /**
   * Checks if event is VKWebAppUpdateConfig or VKWebAppUpdateInsets to
   * know what app config and insets are.
   * @param event
   */
  private handleVkConnectEvent: VKConnectSubscribeHandler = event => {
    const {store} = this.state;

    if (store && event.detail) {
      if (isUpdateConfigEvent(event)) {
        store.dispatch(appConfigActions.updateConfig(event.detail.data));
      } else if (isUpdateInsetsEvent(event)) {
        store.dispatch(
          appConfigActions.updateInsets(event.detail.data.insets),
        );
      }
    }
  };

  public componentDidMount() {
    // When component did mount, we are waiting for update insets and update
    // config events to know what config is.
    vkConnect.subscribe(this.handleVkConnectEvent);

    // Notify native application, initialization is completed. It will make
    // native application loader disappear and show our application.
    // The reason we initialize here is native application automatically
    // sends VKWebAppUpdateConfig and VKWebAppUpdateInsets events when
    // initialization is complete and we dont want to skip them.
    vkConnect.send('VKWebAppInit');

    // Init application.
    this.init();
  }

  public componentDidCatch(error: Error) {
    // Catch error and show error screen if something went wrong.
    this.setState({error: error.message});
  }

  public componentWillUnmount() {
    // Dont forget to cleanup.
    vkConnect.unsubscribe(this.handleVkConnectEvent);
  }

  public render() {
    const {loading, error, store} = this.state;

    // Show loader if application is still loading.
    if (loading || !store) {
      return <AppLoadingView/>;
    }

    // Show error view if error occurred.
    if (error) {
      return (
        <ThemeProvider>
          <AppCrashView onRestartClick={this.init} error={error}/>
        </ThemeProvider>
      );
    }

    // Show application when we got everything we need.
    return (
      <StoreProvider store={store}>
        <ThemeProvider>
          <App/>
        </ThemeProvider>
      </StoreProvider>
    );
  }
}

export default Root;
