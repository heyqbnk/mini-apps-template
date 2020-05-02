import {
  AppConfigReducerState,
  ConfigReducerState,
  DeviceReducerState, LaunchParamsReducerState, StorageReducerState,
} from './reducers';

export interface ReduxState {
  appConfig: AppConfigReducerState;
  config: ConfigReducerState;
  device: DeviceReducerState;
  launchParams: LaunchParamsReducerState;
  storage: StorageReducerState;
}
