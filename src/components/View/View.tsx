import React, {memo} from 'react';
import c from 'classnames';

import {makeStyles} from '@material-ui/styles';
import {Theme} from '../../theme';

import {Suspend, SuspendComponentType} from '../Suspend';
import {SuspendTransition} from '../SuspendTransition';

import {useOS} from '../../hooks';
import {
  VIEW_TRANSITION_ANDROID_DURATION,
  VIEW_TRANSITION_IOS_DURATION,
} from './constants';
import {
  createActiveTransitionHandler,
  createStartTransitionHandler,
} from './utils';

import {ViewProps} from './types';
import {OS} from '../../types';

interface UseTransitionStylesProps {
  componentType: SuspendComponentType;
  os: OS;
}

const useStyles = makeStyles({
  root: {
    height: '100%',
    width: '100%',
    position: 'relative',
  },
}, {name: 'View'});

const useTransitionStyles = makeStyles<Theme, UseTransitionStylesProps>(
  theme => ({
    enter: createStartTransitionHandler(theme, 'enter'),
    enterActive: createActiveTransitionHandler(theme, 'enter'),
    exit: createStartTransitionHandler(theme, 'exit'),
    exitActive: createActiveTransitionHandler(theme, 'exit'),
    exitDone: {display: 'none'},
  }),
  {name: 'View'},
);

export const View = memo((props: ViewProps) => {
  const {
    children, className, isSuspended, keepMounted, componentType,
    wasMountedBefore, keepMountedAfterSuspend, activePanel, id, ...rest
  } = props;
  const os = useOS();
  const mc = useStyles(props);
  const rootClassName = c(mc.root, className);

  const mcTransitions = useTransitionStyles({
    componentType: componentType || 'alternative',
    os,
  });

  return (
    <SuspendTransition
      isSuspended={isSuspended}
      keepMounted={keepMounted}
      keepMountedAfterSuspend={keepMountedAfterSuspend}
      componentType={componentType}
      wasMountedBefore={wasMountedBefore}
      classNames={mcTransitions}
      androidTransitionDuration={VIEW_TRANSITION_ANDROID_DURATION}
      iosTransitionDuration={VIEW_TRANSITION_IOS_DURATION}
    >
      <div data-id={id} className={rootClassName} {...rest}>
        <Suspend activeElement={activePanel}>{children}</Suspend>
      </div>
    </SuspendTransition>
  );
});
