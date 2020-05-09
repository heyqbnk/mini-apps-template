import React, {memo, useMemo} from 'react';

import {makeStyles} from '@material-ui/styles';
import {Theme} from '../../../theme/types';

import {SuspendTransition} from '../SuspendTransition';

import {
  PANEL_TRANSITION_ANDROID_DURATION,
  PANEL_TRANSITION_IOS_DURATION,
} from './constants';
import {
  createActivePhaseTransitionHandler,
  createStartPhaseTransitionHandler,
} from './utils';
import {useDevice} from '../../providers/DeviceProvider';

import {PanelTransitionContext, PanelTransitionProps} from './types';
import {SuspendComponentType} from '../Suspend';
import {OS} from '../../../types';

import {panelTransitionContext} from './context';

interface UseStylesProps extends PanelTransitionProps {
  componentType: SuspendComponentType;
  os: OS;
}

const {Provider} = panelTransitionContext;

const useStyles = makeStyles<Theme, UseStylesProps>(
  theme => ({
    enter: createStartPhaseTransitionHandler(theme, 'enter'),
    enterActive: createActivePhaseTransitionHandler(theme, 'enter'),
    exit: createStartPhaseTransitionHandler(theme, 'exit'),
    exitActive: createActivePhaseTransitionHandler(theme, 'exit'),
    exitDone: {display: 'none'},
  }),
  {name: 'PanelTransition'},
);

export const PanelTransition = memo(
  function PanelTransition(props: PanelTransitionProps) {
    const {
      componentType, children, isSuspended, wasMountedBefore, keepMounted,
      keepMountedAfterSuspend,
    } = props;
    const {os} = useDevice();
    const mc = useStyles({...props, os, componentType});

    const context = useMemo<PanelTransitionContext>(() => ({
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
          androidTransitionDuration={PANEL_TRANSITION_ANDROID_DURATION}
          iosTransitionDuration={PANEL_TRANSITION_IOS_DURATION}
        >
          {children}
        </SuspendTransition>
      </Provider>
    );
  },
);
