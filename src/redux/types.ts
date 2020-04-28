import {AppConfigReducerState} from './reducers/app-config';
import {ConfigReducerState} from './reducers/config';
import {DeviceReducerState} from './reducers/device';
import {LaunchParamsReducerState} from './reducers/launch-params';
import {StorageReducerState} from './reducers/storage';
import {RoutingReducerState} from './reducers/routing';

export interface ReduxState {
  appConfig: AppConfigReducerState;
  config: ConfigReducerState;
  device: DeviceReducerState;
  launchParams: LaunchParamsReducerState;
  routing: RoutingReducerState;
  storage: StorageReducerState;
}
