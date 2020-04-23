import {ofType, unionize, UnionOf} from 'unionize';
import {unionizeConfig} from '../utils';
import {
  AppearanceSchemeType,
  DefaultUpdateConfigData,
  MVKUpdateConfigData,
  UpdateConfigData,
} from '@vkontakte/vk-bridge';

interface PreparedMVKAppConfig
  extends Omit<MVKUpdateConfigData, 'viewport_width' | 'viewport_height'> {
  viewportWidth: number;
  viewportHeight: number;
}

interface PreparedDefaultAppConfig
  extends Omit<DefaultUpdateConfigData, 'app_id' | 'start_time'> {
  appId: string;
  startTime: number;
}

export interface AppConfigReducerState
  extends PreparedMVKAppConfig, PreparedDefaultAppConfig {
}

export const appConfigActions = unionize({
  updateConfig: ofType<UpdateConfigData>(),
  updateAppearanceScheme: ofType<AppearanceSchemeType>(),
}, unionizeConfig);

type AppConfigAction = UnionOf<typeof appConfigActions>;

const initialState: AppConfigReducerState = {
  app: 'vkclient',
  appId: '',
  appearance: 'light',
  scheme: 'client_light',
  insets: {top: 0, bottom: 0, left: 0, right: 0},
  startTime: 0,
  viewportHeight: 0,
  viewportWidth: 0,
};

/**
 * Prepares update config data payload
 * @param {UpdateConfigData} config
 * @returns {PreparedMVKAppConfig | PreparedDefaultAppConfig}
 */
export function prepareAppConfig(
  config: UpdateConfigData,
): PreparedMVKAppConfig | PreparedDefaultAppConfig {
  if ('insets' in config) {
    const {app_id, start_time, ...restConfig} = config;

    return {
      ...restConfig,
      appId: app_id,
      startTime: start_time,
    };
  }
  const {viewport_height, viewport_width, ...restConfig} = config;

  return {
    ...restConfig,
    viewportHeight: viewport_height,
    viewportWidth: viewport_width,
  };
}

/**
 * Responsible for application config sent from VKontakte
 * @param {AppConfigReducerState} state
 * @param {AppConfigAction} action
 * @returns {unknown}
 */
export function appConfigReducer(
  state: AppConfigReducerState = initialState,
  action: AppConfigAction,
) {
  return appConfigActions.match(action, {
    updateConfig: config => ({...state, ...prepareAppConfig(config)}),
    updateAppearanceScheme: scheme => ({...state, scheme}),
    default: () => state,
  });
}
