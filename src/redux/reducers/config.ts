import {ofType, unionize, UnionOf} from 'unionize';
import {unionizeConfig} from '../utils';
import {
  Insets,
  DefaultUpdateConfigData,
  UpdateConfigData,
  MVKUpdateConfigData,
} from '@vkontakte/vk-bridge';

type ConfigData =
  Omit<DefaultUpdateConfigData, 'app_id' | 'start_time'>
  & Omit<MVKUpdateConfigData, 'viewport_width' | 'viewport_height'>;

export interface ConfigReducerState extends ConfigData {
  appId: string;
  startTime: number;
  viewportWidth: number;
  viewportHeight: number;
}

export const configActions = unionize({
  updateConfig: ofType<UpdateConfigData>(),
  updateInsets: ofType<Insets>(),
}, unionizeConfig);

type ConfigAction = UnionOf<typeof configActions>;

const initialState: ConfigReducerState = {
  app: 'vkclient',
  appId: '',
  appearance: 'light',
  scheme: 'client_light',
  insets: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  startTime: 0,
  viewportHeight: 0,
  viewportWidth: 0,
};

/**
 * Редьюсер ответственный за конфиг приложения который приходит от ВКонтакте.
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
        }
      }
      const {viewport_height, viewport_width, ...restConfig} = config;

      return {
        ...state,
        ...restConfig,
        viewportHeight: viewport_height,
        viewportWidth: viewport_width,
      }
    },
    updateInsets: insets => ({...state, insets}),
    default: () => state,
  });
}

export default configReducer;
