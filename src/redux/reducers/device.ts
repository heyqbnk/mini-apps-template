import {ofType, unionize, UnionOf} from 'unionize';
import {unionizeConfig} from '../utils';
import {Insets, OS} from '../../types';

export interface DeviceReducerState {
  /**
   * Device operating system
   */
  os: OS;
  /**
   * Initial device insets. Not changing during application lifetime
   */
  insets: Insets;
  /**
   * Current device insets. Changing during application lifetime. For example,
   * when virtual keyboard is being opened
   */
  currentInsets: Insets;
}

export const deviceActions = unionize({
  setCurrentInsets: ofType<Insets>(),
  setOS: ofType<OS>(),
}, unionizeConfig);

type DeviceAction = UnionOf<typeof deviceActions>;

const initialState: DeviceReducerState = {
  os: OS.IOS,
  insets: {top: 0, bottom: 0, left: 0, right: 0},
  currentInsets: {top: 0, bottom: 0, left: 0, right: 0},
};

/**
 * Responsible for data connected with current device
 * @param {DeviceReducerState} state
 * @param {DeviceAction} action
 * @returns {unknown}
 */
export function deviceReducer(
  state: DeviceReducerState = initialState,
  action: DeviceAction,
) {
  return deviceActions.match(action, {
    setCurrentInsets: currentInsets => ({...state, currentInsets}),
    setOS: os => ({...state, os}),
    default: () => state,
  });
}
