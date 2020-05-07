import React, {
  Children,
  cloneElement,
  memo,
  ReactElement,
  useCallback,
} from 'react';
import c from 'classnames';

import {makeStyles} from '@material-ui/styles';

import {CSSTransition} from 'react-transition-group';

import {useOS} from '../../hooks';
import {setBodyOverflow} from '../../utils';

import {OS} from '../../types';
import {SuspendableOptionalProps} from '../Suspend';
import {ClassNameMap} from '@material-ui/styles';

export interface SuspendTransitionProps extends SuspendableOptionalProps {
  children: ReactElement<{ className: string }>;
  classNames: ClassNameMap;
  iosTransitionDuration: number;
  androidTransitionDuration: number;
}

const useStyles = makeStyles({
  unmounted: {display: 'none'},
}, {name: 'SuspendTransition'});

export const SuspendTransition = memo((props: SuspendTransitionProps) => {
  const {
    children, isSuspended, keepMounted, keepMountedAfterSuspend, componentType,
    wasMountedBefore, androidTransitionDuration, iosTransitionDuration,
    classNames,
  } = props;
  const mc = useStyles(props);
  const os = useOS();

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
});
