import {createContext, useContext} from 'react';
import {ViewTransitionContext} from './types';

export const viewTransitionContext = createContext<ViewTransitionContext>({
  isSuspended: false,
  wasMountedBefore: false,
  componentType: 'main',
  keepMounted: false,
  keepMountedAfterSuspend: false,
});

export const useViewTransition = () => useContext(viewTransitionContext);
