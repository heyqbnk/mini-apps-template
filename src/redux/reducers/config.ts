import {ofType, unionize, UnionOf} from 'unionize';
import {unionizeConfig} from '../utils';
import {
  AppearanceSchemeType,
  DefaultUpdateConfigData,
  MVKUpdateConfigData,
  UpdateConfigData,
} from '@vkontakte/vk-bridge';
import {Config} from '../../config';
import {LaunchParams, OS} from '../../types';
import {getInsets} from '../../utils/dom';

type ConfigData =
  Omit<DefaultUpdateConfigData, 'app_id' | 'start_time'>
  & Omit<MVKUpdateConfigData, 'viewport_width' | 'viewport_height'>;

export interface ConfigReducerState extends ConfigData {
  appId: string;
  appConfig: Config;
  startTime: number;
  viewportWidth: number;
  viewportHeight: number;
  /**
   * Application launch parameters sent from VKontakte
   */
  launchParams: LaunchParams;
  /**
   * Current operating system
   */
  os: OS;
}

export const configActions = unionize({
  updateConfig: ofType<UpdateConfigData>(),
  updateTheme: ofType<AppearanceSchemeType>(),
}, unionizeConfig);

type ConfigAction = UnionOf<typeof configActions>;

const initialState: ConfigReducerState = {
  app: 'vkclient',
  appConfig: {gqlHttpUrl: '', gqlWsUrl: ''},
  appId: '',
  appearance: 'light',
  scheme: 'client_light',
  insets: getInsets(),
  startTime: 0,
  viewportHeight: 0,
  viewportWidth: 0,
  launchParams: {
    accessTokenSettings: [],
    appId: 0,
    areNotificationsEnabled: false,
    isAppUser: false,
    isFavorite: false,
    language: 'ru',
    platform: 'desktop_web',
    ref: 'other',
    userId: 0,
    groupId: null,
    viewerGroupRole: null,
    sign: '',
  },
  os: OS.IOS,
};

/**
 * Responsible for config sent from VKontakte
 */
function configReducer(
  state: ConfigReducerState = initialState,
  action: ConfigAction,
) {
  return configActions.match(action, {
    updateConfig: config => {
      if ('insets' in config) {
        const {app_id, start_time, ...restConfig} = config;

        return {
          ...state,
          ...restConfig,
          appId: app_id,
          startTime: start_time,
        };
      }
      const {viewport_height, viewport_width, ...restConfig} = config;

      return {
        ...state,
        ...restConfig,
        viewportHeight: viewport_height,
        viewportWidth: viewport_width,
      };
    },
    updateTheme: scheme => ({...state, scheme}),
    default: () => state,
  });
}

export default configReducer;
