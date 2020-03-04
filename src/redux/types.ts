import {ConfigReducerState} from './reducers/config';
import {StorageReducerState} from './reducers/storage';
import {LayoutReducerState} from './reducers/layout';

export interface ReduxState {
  config: ConfigReducerState;
  storage: StorageReducerState;
  layout: LayoutReducerState;
}
