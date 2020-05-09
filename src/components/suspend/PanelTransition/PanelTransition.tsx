import {createCustomTransition} from '../SuspendTransition';

import {
  createActivePhaseTransitionHandler,
  createStartPhaseTransitionHandler,
} from './utils';
import {
  PANEL_TRANSITION_ANDROID_DURATION,
  PANEL_TRANSITION_IOS_DURATION,
} from './constants';

const {Component, useContext} = createCustomTransition({
  displayName: 'PanelTransition',
  createActivePhaseTransitionHandler,
  createStartPhaseTransitionHandler,
  iosTransitionDuration: PANEL_TRANSITION_IOS_DURATION,
  androidTransitionDuration: PANEL_TRANSITION_ANDROID_DURATION,
});

export const PanelTransition = Component;
export const usePanelTransition = useContext;
