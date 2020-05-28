import {Config} from '../../config';
import {ConfigProviderProps as VKConfigProviderProps} from 'vkma-ui';

export interface ConfigContext {
  envConfig: Config;
}

export interface ConfigProviderProps extends VKConfigProviderProps {
  /**
   * Environments-based config
   */
  envConfig: Config;
}
