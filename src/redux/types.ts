import {ILayoutReducerState} from './fields/layout';
import {IMetaReducerState} from './fields/meta';
import {IUserReducerState} from './fields/user';

export interface IReduxState {
  layout: ILayoutReducerState;
  meta: IMetaReducerState;
  user: IUserReducerState;
}
