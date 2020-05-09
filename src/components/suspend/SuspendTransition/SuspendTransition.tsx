import React, {
  Children,
  cloneElement,
  memo,
  useCallback,
} from 'react';
import c from 'classnames';

import {makeStyles} from '@material-ui/styles';

import {CSSTransition} from 'react-transition-group';

import {useDevice} from '../../providers/DeviceProvider';
import {setBodyOverflow} from '../../../utils';

import {OS} from '../../../types';
import {SuspendTransitionProps} from './types';

const useStyles = makeStyles({
  unmounted: {display: 'none'},
}, {name: 'SuspendTransition'});

export const SuspendTransition = memo(
  function SuspendTransition(props: SuspendTransitionProps) {
    const {
      children, isSuspended, keepMounted, keepMountedAfterSuspend, componentType,
      wasMountedBefore, androidTransitionDuration, iosTransitionDuration,
      classNames,
    } = props;
    const mc = useStyles(props);
    const {os} = useDevice();

    const keepMountedOnExit = keepMounted
      || (keepMountedAfterSuspend && wasMountedBefore);
    const isAndroid = os === OS.Android;
    const timeout = isAndroid
      ? androidTransitionDuration
      : iosTransitionDuration;

    // Restricts body overflow on panel enter
    const hideBodyOverflow = useCallback(() => {
      if (componentType === 'alternative') {
        setBodyOverflow(false);
      }
    }, [componentType]);

    // Restores body overflow
    const showBodyOverflow = useCallback(() => {
      if (componentType === 'alternative') {
        setBodyOverflow(true);
      }
    }, [componentType]);

    const [formattedChildren] = Children.map(children, child => {
      return cloneElement(child, {
        className: c(child.props.className, {
          [mc.unmounted]: !wasMountedBefore,
        }),
      });
    });

    return (
      <CSSTransition
        in={!isSuspended}
        mountOnEnter={!keepMounted}
        unmountOnExit={!keepMountedOnExit}
        classNames={classNames}
        timeout={timeout}
        onEnter={hideBodyOverflow}
        onExit={hideBodyOverflow}
        onEntered={showBodyOverflow}
        onExited={showBodyOverflow}
      >
        {formattedChildren}
      </CSSTransition>
    );
  },
);
