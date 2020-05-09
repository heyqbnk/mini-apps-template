import {
  DefaultUpdateConfigData,
  MVKUpdateConfigData, UpdateConfigData,
} from '@vkontakte/vk-bridge';
import {Config} from '../../../config';
import {LaunchParams} from '../../../types';
import {ReactNode} from 'react';

export interface PreparedMVKAppConfig
  extends Omit<MVKUpdateConfigData, 'viewport_width' | 'viewport_height'> {
  viewportWidth: number;
  viewportHeight: number;
}

export interface PreparedDefaultAppConfig
  extends Omit<DefaultUpdateConfigData, 'app_id' | 'start_time'> {
  appId: string;
  startTime: number;
}

export type AppConfig = PreparedMVKAppConfig & PreparedDefaultAppConfig;

export interface ConfigContext {
  /**
   * Application config sent from VKontakte
   * NOTE: It is recommended to use copied appConfig values in other providers.
   *  For example, appConfig contains property "insets" which defines current
   *  device insets. This property is correctly realised in DeviceProvider.
   *  Insets in appConfig are updated every time they changes even if virtual
   *  mobile keyboard is opened or closed. There are some other props which
   *  are realised in other providers and you have to use them instead of this
   *  one to make your code work more stable
   */
  appConfig: AppConfig;
  /**
   * Environments-based config
   */
  envConfig: Config;
  /**
   * Application launch parameters sent with search string in url from
   * VKontakte
   */
  launchParams: LaunchParams;
}

export interface ConfigProviderProps {
  envConfig: Config;
  appConfig?: UpdateConfigData;
  launchParams: LaunchParams;
  children: ReactNode;
};
