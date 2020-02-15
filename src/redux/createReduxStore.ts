import {IReduxState} from './types';
import {Store, createStore, combineReducers} from 'redux';
import {devToolsEnhancer} from 'redux-devtools-extension';

import {layoutReducer} from './fields/layout';
import {metaReducer} from './fields/meta';
import {userReducer} from './fields/user';

const reducers = combineReducers<IReduxState>({
  layout: layoutReducer,
  meta: metaReducer,
  user: userReducer,
});

function createReduxStore(state?: IReduxState): Store<IReduxState> {
  return createStore(reducers, state, devToolsEnhancer({}));
}

export default createReduxStore;
