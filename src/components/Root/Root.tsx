import React, {memo, useCallback, useEffect, useMemo, useState} from 'react';

import AppLoadingView from '../AppLoadingView';
import HttpProvider from '../HttpProvider';
import {Provider as StoreProvider} from 'react-redux';

import config from '../../config';
import createReduxStore from '../../redux';
import vkConnect, {VKConnectSubscribeHandler} from '@vkontakte/vk-connect';

import Http from '../../lib/Http';
import {Store} from 'redux';
import {IReduxState} from '../../redux/types';
import {appConfigActions} from '../../redux/fields/app-config';

const Root = memo(() => {
  const [loading, setLoading] = useState(true);
  const http = useMemo(() => new Http(
    config.apiBaseUrl,
    window.location.search.slice(1),
  ), [config.apiBaseUrl]);
  const [store, setStore] = useState<null | Store<IReduxState>>(null);

  const init = useCallback(async () => {
    setLoading(true);
    const cities = await http.fetchCities();

    setStore(
      createReduxStore({
        layout: {},
        user: {},
        meta: {
          cities,
        },
      }),
    );
    setLoading(false);
  }, [http]);

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    const listener: VKConnectSubscribeHandler = event => {
      if (store) {
        if (event.detail) {
          const {type, data} = event.detail;

          if (type === 'VKWebAppUpdateConfig') {
            store.dispatch(appConfigActions.updateConfig(data));
          }
          // TODO: Create github issue. Not ReceiveDataMap key for type
          else if (type === 'VKWebAppUpdateInsets') {
            store.dispatch(appConfigActions.updateInsets(data.insets));
          }
        }
      }
    };

    vkConnect.subscribe(listener);

    return () => vkConnect.unsubscribe(listener);
  }, [store]);

  if (loading || !store) {
    return <AppLoadingView/>;
  }

  return (
    <StoreProvider store={store}>
      <HttpProvider http={http}>
        Root
      </HttpProvider>
    </StoreProvider>
  );
});

export default Root;
