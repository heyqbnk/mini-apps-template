import {createContext, useContext} from 'react';
import {useConfig as useVKConfig} from 'vkma-ui';

import {ConfigContext} from './types';

export const configContext = createContext<ConfigContext>({
  envConfig: {
    gqlWsUrl: '',
    gqlHttpUrl: '',
  },
});
export const useConfig = () => {
  const config = useContext(configContext);
  const vkConfig = useVKConfig();

  return {...config, ...vkConfig};
};

configContext.displayName = 'ConfigContext';
