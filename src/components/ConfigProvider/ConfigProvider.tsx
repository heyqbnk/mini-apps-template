import React, {memo, useMemo} from 'react';

import {ConfigProvider as VKConfigProvider} from 'vkma-ui';

import {configContext} from './context';

import {ConfigContext, ConfigProviderProps} from './types';

const {Provider} = configContext;

export const ConfigProvider = memo(
  function ConfigProvider(props: ConfigProviderProps) {
    const {envConfig, ...rest} = props;

    const context = useMemo<ConfigContext>(() => ({
      envConfig,
    }), [envConfig]);

    return (
      <Provider value={context}>
        <VKConfigProvider {...rest}/>
      </Provider>
    );
  },
);
