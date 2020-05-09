import React, {
  Children,
  cloneElement,
  memo,
} from 'react';
import c from 'classnames';

import {makeStyles} from '@material-ui/styles';

import {CSSTransition} from 'react-transition-group';

import {useDevice} from '../../providers/DeviceProvider';
import {useTransitionHandlers} from './utils';

import {OS} from '../../../types';
import {SuspendTransitionProps} from './types';

const useStyles = makeStyles({
  unmounted: {display: 'none'},
}, {name: 'SuspendTransition'});

export const SuspendTransition = memo(
  function SuspendTransition(props: SuspendTransitionProps) {
    const {
      children, isSuspended, keepMounted, keepMountedAfterSuspend,
      componentType, wasMountedBefore, androidTransitionDuration,
      iosTransitionDuration, classNames, onEnter, onEntered, onExit, onExited,
    } = props;
    const mc = useStyles(props);
    const {os} = useDevice();

    const keepMountedOnExit = keepMounted
      || (keepMountedAfterSuspend && wasMountedBefore);
    const isAndroid = os === OS.Android;
    const timeout = isAndroid
      ? androidTransitionDuration
      : iosTransitionDuration;

    const [formattedChildren] = Children.map(children, child => {
      return cloneElement(child, {
        className: c(child.props.className, {
          [mc.unmounted]: !wasMountedBefore,
        }),
      });
    });

    const handlers = useTransitionHandlers(
      componentType, onEnter, onEntered, onExit, onExited,
    );

    return (
      <CSSTransition
        in={!isSuspended}
        mountOnEnter={!keepMounted}
        unmountOnExit={!keepMountedOnExit}
        classNames={classNames}
        timeout={timeout}
        {...handlers}
      >
        {formattedChildren}
      </CSSTransition>
    );
  },
);
