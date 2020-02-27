import {IReduxState} from './types';
import {Store, createStore, combineReducers} from 'redux';
import {devToolsEnhancer} from 'redux-devtools-extension';

import appConfigReducer from './reducers/app-config';
import storageReducer from './reducers/bridge-storage';

const reducers = combineReducers<IReduxState>({
  appConfig: appConfigReducer,
  storage: storageReducer,
});

function createReduxStore(state?: Partial<IReduxState>): Store<IReduxState> {
  return createStore(reducers, state, devToolsEnhancer({}));
}

export default createReduxStore;
