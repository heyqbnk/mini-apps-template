import {createCustomTransition} from '../SuspendTransition';

import {
  createActivePhaseTransitionHandler,
  createStartPhaseTransitionHandler,
} from './utils';
import {
  VIEW_TRANSITION_ANDROID_DURATION,
  VIEW_TRANSITION_IOS_DURATION,
} from './constants';

const {Component, useContext} = createCustomTransition({
  displayName: 'ViewTransition',
  createActivePhaseTransitionHandler,
  createStartPhaseTransitionHandler,
  iosTransitionDuration: VIEW_TRANSITION_IOS_DURATION,
  androidTransitionDuration: VIEW_TRANSITION_ANDROID_DURATION,
});

export const ViewTransition = Component;
export const useViewTransition = useContext;
