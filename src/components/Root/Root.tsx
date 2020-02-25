import React, {memo, useCallback, useEffect, useState} from 'react';

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

const Root = memo(() => {
  const [loading, setLoading] = useState(true);
  const [store, setStore] = useState<null | Store<IReduxState>>(null);
  const [error, setError] = useState<null | string>(null);

  // Function responsible for initializing an application. We created a separate
  // function to use it in future. For example, in case when application
  // crashed and we need re-initialize. We will just have to call this function.
  const init = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Do all requests and operations required to launch application here and
      // then create redux store.
      setStore(createReduxStore());
    } catch (e) {
      const err = e as Error;
      setError(err.message);
    }

    setLoading(false);
  }, []);

  // Listen for events coming from vkconnect. We need to detect all
  // changes in AppConfig and watch for new insets for appropriate work
  // of application.
  useEffect(() => {
    const listener: VKConnectSubscribeHandler = event => {
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

    vkConnect.subscribe(listener);
    return () => vkConnect.unsubscribe(listener);
  }, [store]);

  // Notify native application, initialization is completed. It will make
  // native application loader disappear and show our application.
  useEffect(() => {
    // The reason we initialize here is native application automatically
    // sends VKWebAppUpdateConfig and VKWebAppUpdateInsets events when
    // initialization is complete and we dont want to skip them.
    vkConnect.send('VKWebAppInit');
  }, []);

  // When component did mount, initialize application.
  useEffect(() => {
    init();
  }, [init]);

  // Show loader if application is still loading.
  if (loading || !store) {
    return <AppLoadingView/>;
  }

  if (error) {
    return (
      <ThemeProvider>
        <AppCrashView onRestartClick={init} error={error}/>
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
});

export default Root;
