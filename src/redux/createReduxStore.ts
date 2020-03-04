import {ReduxState} from './types';
import {Store, createStore, combineReducers} from 'redux';
import {devToolsEnhancer} from 'redux-devtools-extension';

import configReducer from './reducers/config';
import storageReducer from './reducers/storage';
import layoutReducer from './reducers/layout';

const reducers = combineReducers<ReduxState>({
  config: configReducer,
  storage: storageReducer,
  layout: layoutReducer,
});

function createReduxStore(state?: Partial<ReduxState>): Store<ReduxState> {
  return createStore(reducers, state, devToolsEnhancer({}));
}

export default createReduxStore;
