import {Config} from '../../config';

export interface ConfigReducerState extends Config {
}

const initialState: ConfigReducerState = {
  gqlWsUrl: '',
  gqlHttpUrl: '',
};

/**
 * Responsible for envrionment config state
 * @param {ConfigReducerState} state
 * @returns {ConfigReducerState}
 */
export function configReducer(state: ConfigReducerState = initialState) {
  return state;
}
