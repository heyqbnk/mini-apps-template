import {ReduxState} from './types';
import {Store, createStore, combineReducers} from 'redux';
import {devToolsEnhancer} from 'redux-devtools-extension';
import {
  appConfigReducer,
  configReducer,
  deviceReducer,
  launchParamsReducer,
  storageReducer,
} from './reducers';

const reducers = combineReducers<ReduxState>({
  appConfig: appConfigReducer,
  config: configReducer,
  device: deviceReducer,
  launchParams: launchParamsReducer,
  storage: storageReducer,
});

export function createReduxStore(state?: Partial<ReduxState>): Store<ReduxState> {
  return createStore(reducers, state, devToolsEnhancer({}));
}
