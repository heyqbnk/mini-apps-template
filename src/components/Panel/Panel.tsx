import React, {
  cloneElement,
  memo,
  ReactNode,
  ReactNodeArray,
} from 'react';
import c from 'classnames';

import {makeStyles} from '@material-ui/styles';
import {Theme} from '../../theme';

import {Separator} from '../Separator';
import {SuspendTransition} from '../SuspendTransition';

import {useInsets, useOS} from '../../hooks';
import {
  createActiveTransitionHandler,
  createStartTransitionHandler,
} from './utils';
import {
  PANEL_HEADER_HEIGHT_ANDROID,
  PANEL_HEADER_HEIGHT_IOS,
} from '../PanelHeader';
import {
  PANEL_TRANSITION_ANDROID_DURATION,
  PANEL_TRANSITION_IOS_DURATION,
} from './constants';

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
    boxSizing: 'border-box',
    padding: ({topInset, bottomInset, header}) => {
      const paddingTop = topInset + (header ? PANEL_HEADER_HEIGHT_IOS : 0);
      return `${paddingTop}px 0 ${bottomInset}px`;
    },
  },
  rootAndroid: {
    padding: ({topInset, bottomInset, header}) => {
      const paddingTop = topInset + (header ? PANEL_HEADER_HEIGHT_ANDROID : 0);
      return `${paddingTop}px 0 ${bottomInset}px`;
    },
  },
  content: {
    width: '100%',
    height: '100%',
    overflow: 'auto',
    backgroundColor: theme.components.Panel.backgroundColor,
  },
}), {name: 'Panel'});

const useTransitionStyles = makeStyles<Theme, UseTransitionStylesProps>(
  theme => ({
    enter: createStartTransitionHandler(theme, 'enter'),
    enterActive: createActiveTransitionHandler(theme, 'enter'),
    exit: createStartTransitionHandler(theme, 'exit'),
    exitActive: createActiveTransitionHandler(theme, 'exit'),
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

  const mc = useStyles({
    ...props,
    header,
    topInset: top,
    bottomInset: bottom,
  });

  const mcTransitions = useTransitionStyles({
    componentType: componentType || 'alternative',
    os,
  });

  const rootClassName = c(
    className,
    mc.root,
    {[mc.rootAndroid]: os === OS.Android},
  );

  return (
    <SuspendTransition
      isSuspended={isSuspended}
      keepMounted={keepMounted}
      keepMountedAfterSuspend={keepMountedAfterSuspend}
      componentType={componentType}
      wasMountedBefore={wasMountedBefore}
      classNames={mcTransitions}
      androidTransitionDuration={PANEL_TRANSITION_ANDROID_DURATION}
      iosTransitionDuration={PANEL_TRANSITION_IOS_DURATION}
    >
      <div data-id={id} className={rootClassName} {...rest}>
        <div className={mc.content}>
          <Separator/>
          {content}
        </div>
      </div>
    </SuspendTransition>
  );
});
