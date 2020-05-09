import React, {memo, useMemo} from 'react';

import {makeStyles} from '@material-ui/styles';
import {Theme} from '../../../theme/types';

import {SuspendTransition} from '../SuspendTransition';

import {
  VIEW_TRANSITION_ANDROID_DURATION,
  VIEW_TRANSITION_IOS_DURATION,
} from './constants';
import {
  createActivePhaseTransitionHandler,
  createStartPhaseTransitionHandler,
} from './utils';
import {useDevice} from '../../providers/DeviceProvider';

import {ViewTransitionContext, ViewTransitionProps} from './types';
import {SuspendComponentType} from '../Suspend';
import {OS} from '../../../types';

import {viewTransitionContext} from './context';

interface UseStylesProps extends ViewTransitionProps {
  componentType: SuspendComponentType;
  os: OS;
}

const {Provider} = viewTransitionContext;

const useStyles = makeStyles<Theme, UseStylesProps>(
  theme => ({
    enter: createStartPhaseTransitionHandler(theme, 'enter'),
    enterActive: createActivePhaseTransitionHandler(theme, 'enter'),
    exit: createStartPhaseTransitionHandler(theme, 'exit'),
    exitActive: createActivePhaseTransitionHandler(theme, 'exit'),
    exitDone: {display: 'none'},
  }),
  {name: 'ViewTransition'},
);

export const ViewTransition = memo(
  function ViewTransition(props: ViewTransitionProps) {
    const {
      componentType, children, isSuspended, wasMountedBefore, keepMounted,
      keepMountedAfterSuspend,
    } = props;
    const {os} = useDevice();
    const mc = useStyles({...props, os, componentType});

    const context = useMemo<ViewTransitionContext>(() => ({
      componentType, isSuspended, wasMountedBefore, keepMounted,
      keepMountedAfterSuspend,
    }), [
      componentType, isSuspended, wasMountedBefore, keepMounted,
      keepMountedAfterSuspend,
    ]);

    return (
      <Provider value={context}>
        <SuspendTransition
          {...props}
          classNames={mc}
          androidTransitionDuration={VIEW_TRANSITION_ANDROID_DURATION}
          iosTransitionDuration={VIEW_TRANSITION_IOS_DURATION}
        >
          {children}
        </SuspendTransition>
      </Provider>
    );
  },
);
