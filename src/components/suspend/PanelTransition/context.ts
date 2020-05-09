import {createContext, useContext} from 'react';
import {PanelTransitionContext} from './types';

export const panelTransitionContext = createContext<PanelTransitionContext>({
  isSuspended: false,
  wasMountedBefore: false,
  componentType: 'main',
  keepMounted: false,
  keepMountedAfterSuspend: false,
});

export const usePanelTransition = () => useContext(panelTransitionContext);
