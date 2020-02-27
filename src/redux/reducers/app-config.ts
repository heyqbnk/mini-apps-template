import {ofType, unionize, UnionOf} from 'unionize';
import {unionizeConfig} from '../utils';
import {UpdateConfigData} from '@vkontakte/vk-bridge';

export interface IAppConfigReducerState
  extends Omit<UpdateConfigData, 'app_id' | 'start_time'> {
  appId: string;
  startTime: number;
}

export const appConfigActions = unionize({
  updateConfig: ofType<UpdateConfigData>(),
  updateInsets: ofType<UpdateConfigData['insets']>()
}, unionizeConfig);

type TAppConfigAction = UnionOf<typeof appConfigActions>;

const initialState: IAppConfigReducerState = {
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
};

/**
 * Reducer responsible for application config coming from VKontakte.
 */
function appConfigReducer(
  state: IAppConfigReducerState = initialState,
  action: TAppConfigAction,
) {
  return appConfigActions.match(action, {
    updateConfig: ({app_id, start_time, ...config}) => ({
      ...state,
      ...config,
      appId: app_id,
      startTime: start_time,
    }),
    updateInsets: insets => ({...state, insets}),
    default: () => state,
  });
}

export default appConfigReducer;
