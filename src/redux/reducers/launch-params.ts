import {LaunchParams} from '../../types';

export interface LaunchParamsReducerState extends LaunchParams {
}

const initialState: LaunchParamsReducerState = {
  accessTokenSettings: [],
  appId: 0,
  areNotificationsEnabled: false,
  isAppUser: false,
  isFavorite: false,
  language: 'ru',
  platform: 'desktop_web',
  ref: 'other',
  userId: 0,
  groupId: null,
  viewerGroupRole: null,
  sign: '',
};

/**
 * Responsible for application launch parameters sent from VKontakte
 * @param {LaunchParamsReducerState} state
 * @returns {LaunchParamsReducerState}
 */
export function launchParamsReducer(
  state: LaunchParamsReducerState = initialState,
) {
  return state;
}
