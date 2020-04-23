import {ReduxState} from './types';
import {Store, createStore, combineReducers} from 'redux';
import {devToolsEnhancer} from 'redux-devtools-extension';

import {appConfigReducer} from './reducers/app-config';
import {configReducer} from './reducers/config';
import {deviceReducer} from './reducers/device';
import {launchParamsReducer} from './reducers/launch-params';
import {storageReducer} from './reducers/storage';

const reducers = combineReducers<ReduxState>({
  appConfig: appConfigReducer,
  config: configReducer,
  device: deviceReducer,
  launchParams: launchParamsReducer,
  storage: storageReducer,
});

function createReduxStore(state?: Partial<ReduxState>): Store<ReduxState> {
  return createStore(reducers, state, devToolsEnhancer({}));
}

export default createReduxStore;
