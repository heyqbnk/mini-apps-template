import {IAppConfigReducerState} from './reducers/app-config';
import {TStorageReducerState} from './reducers/bridge-storage';

export interface IReduxState {
  appConfig: IAppConfigReducerState;
  storage: TStorageReducerState;
}
