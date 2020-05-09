import React, {memo, useEffect, useMemo, useState} from 'react';

import {configContext} from './context';

import {AppConfig, ConfigContext, ConfigProviderProps} from './types';
import {prepareAppConfig} from './utils';

const {Provider} = configContext;

export const ConfigProvider = memo(
  function ConfigProvider(props: ConfigProviderProps) {
    const {
      children, appConfig: parentAppConfig, launchParams, envConfig,
    } = props;

    const [appConfig, setAppConfig] = useState<AppConfig>(() => ({
      app: 'vkclient',
      appId: '',
      appearance: 'light',
      scheme: 'client_light',
      insets: {top: 0, bottom: 0, left: 0, right: 0},
      startTime: 0,
      viewportHeight: 0,
      viewportWidth: 0,
      ...(parentAppConfig ? prepareAppConfig(parentAppConfig) : {}),
    }));

    const context = useMemo<ConfigContext>(() => ({
      appConfig,
      launchParams,
      envConfig,
    }), [appConfig, launchParams, envConfig]);

    // Each time, new config parts come, update internal app config
    useEffect(() => {
      if (parentAppConfig) {
        setAppConfig(appConfig => ({
          ...appConfig,
          ...prepareAppConfig(parentAppConfig),
        }));
      }
    }, [parentAppConfig]);

    return <Provider value={context}>{children}</Provider>;
  },
);
