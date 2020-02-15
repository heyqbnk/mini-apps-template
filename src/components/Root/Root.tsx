import React, {memo, useCallback, useEffect, useState} from 'react';

import AppLoadingView from '../AppLoadingView';
import App from '../App';
import {Provider as StoreProvider} from 'react-redux';

import createReduxStore from '../../redux';
import vkConnect, {VKConnectSubscribeHandler} from '@vkontakte/vk-connect';
import {appConfigActions} from '../../redux/reducers/app-config';
import {isUpdateConfigEvent, isUpdateInsetsEvent} from './utils';

import {Store} from 'redux';
import {IReduxState} from '../../redux/types';

const Root = memo(() => {
  const [loading, setLoading] = useState(true);
  const [store, setStore] = useState<null | Store<IReduxState>>(null);

  // Function responsible for initializing an application. We created a separate
  // function to use it in future. For example, in case when application
  // crashed and we need re-initialize. We will just have to call this function.
  const init = useCallback(async () => {
    setLoading(true);

    // Do all requests and operations required to launch application here and
    // then create redux store.
    setStore(createReduxStore());

    setLoading(false);
  }, []);

  // When component did mount, initialize application.
  useEffect(() => {
    init();
  }, [init]);

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

  // Show loader if application is still loading.
  if (loading || !store) {
    return <AppLoadingView/>;
  }

  // Show application when we got everything we need.
  return (
    <StoreProvider store={store}>
      <App/>
    </StoreProvider>
  );
});

export default Root;
