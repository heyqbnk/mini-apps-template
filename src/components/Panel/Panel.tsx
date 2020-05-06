import React, {
  cloneElement,
  memo,
  ReactNode,
  ReactNodeArray,
  useMemo,
} from 'react';
import c from 'classnames';

import {makeStyles} from '@material-ui/styles';
import {Theme} from '../../theme';

import {Separator} from '../Separator';
import {CSSTransition} from 'react-transition-group';

import {useInsets, useOS} from '../../hooks';
import {getTransitionActiveCSS, getTransitionBaseCSS} from './utils';

import {OS} from '../../types';
import {PanelProps} from './types';
import {SuspendComponentType} from '../Suspend';

interface UseStylesProps extends PanelProps {
  topInset: number;
  bottomInset: number;
}

interface UseTransitionStylesProps {
  componentType: SuspendComponentType;
  os: OS;
}

const useStyles = makeStyles<Theme, UseStylesProps>(theme => ({
  root: {
    width: '100%',
    height: '100%',
    position: 'relative',
    boxSizing: 'border-box',
    backgroundColor: theme.components.Panel.backgroundColor,
    padding: ({topInset, bottomInset, header}) => {
      return `${topInset + (header ? 52 : 0)}px 0 ${bottomInset}px`;
    },
  },
  rootAndroid: {
    padding: ({topInset, bottomInset, header}) => {
      return `${topInset + (header ? 56 : 0)}px 0 ${bottomInset}px`;
    },
  },
  rootUnmounted: {display: 'none'},
  separator: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: ({topInset, header}) => topInset + (header ? 52 : 0),
  },
  separatorAndroid: {
    top: ({topInset, header}) => topInset + (header ? 56 : 0),
  },
}), {name: 'Panel'});

const useTransitionStyles = makeStyles<Theme, UseTransitionStylesProps>(
  theme => ({
    enter: ({os, componentType}) => {
      return getTransitionBaseCSS(theme, os, componentType, 'enter');
    },
    enterActive: ({componentType}) => {
      return getTransitionActiveCSS(theme, componentType, 'enter');
    },
    exit: ({os, componentType}) => {
      return getTransitionBaseCSS(theme, os, componentType, 'exit');
    },
    exitActive: ({componentType}) => {
      return getTransitionActiveCSS(theme, componentType, 'exit');
    },
    exitDone: {display: 'none'},
  }),
  {name: 'Panel'},
);

export const Panel = memo((props: PanelProps) => {
  const {
    className, component: Component, children, header, isSuspended,
    keepMounted, keepMountedAfterSuspend, wasMountedBefore, id, componentType,
    ...rest
  } = props;

  if (Component && children) {
    throw new Error(
      'It is not allowed to pass "component" and "children" props in ' +
      'Panel at the same time',
    );
  }
  let content: ReactNode | ReactNodeArray = null;

  if (Component) {
    content = <Component isSuspended={isSuspended}/>;
  } else if (children) {
    const childrenArr = Array.isArray(children) ? children : [children];

    content = childrenArr.map((c, idx) => {
      // Avoid passing isSuspended prop to non-classic React components
      if (typeof c.type === 'string') {
        return c;
      }
      return cloneElement(c, {
        key: idx,
        isSuspended,
        wasMountedBefore,
        keepMounted,
        keepMountedAfterSuspend,
        componentType,
      });
    });
  }

  const {top, bottom} = useInsets();
  const os = useOS();

  const keepMountedOnExit = keepMounted
    || (keepMountedAfterSuspend && wasMountedBefore);
  const isAndroid = os === OS.Android;
  // TODO: Replace with value from theme
  const duration = useMemo(() => 600, [os]);

  const mc = useStyles({
    ...props,
    header,
    topInset: top,
    bottomInset: bottom,
  });

  const mcTransitions = useTransitionStyles({
    componentType: componentType || 'side',
    os,
  });

  const separatorClassName = c(mc.separator, {
    [mc.separatorAndroid]: isAndroid,
  });

  const rootClassName = c(
    className,
    mc.root,
    {
      [mc.rootAndroid]: isAndroid,
      [mc.rootUnmounted]: !wasMountedBefore,
    },
  );

  return (
    <CSSTransition
      in={!isSuspended}
      mountOnEnter={!keepMounted}
      unmountOnExit={!keepMountedOnExit}
      classNames={mcTransitions}
      timeout={duration}
    >
      <div className={rootClassName} id={id} {...rest}>
        <Separator className={separatorClassName}/>
        {content}
      </div>
    </CSSTransition>
  );
});
