import React, {cloneElement, memo, ReactNode, ReactNodeArray} from 'react';
import c from 'classnames';

import {makeStyles} from '@material-ui/styles';
import {Theme} from '../../theme';

import {Separator} from '../Separator';

import {useInsets, useOS} from '../../hooks';

import {OS} from '../../types';
import {PanelProps} from './types';

interface UseStylesProps extends PanelProps {
  topInset: number;
  bottomInset: number;
}

const useStyles = makeStyles<Theme, UseStylesProps>(() => ({
  root: {
    height: '100%',
    position: 'relative',
    boxSizing: 'border-box',
    padding: ({topInset, bottomInset, header}) => {
      return `${topInset + (header ? 52 : 0)}px 0 ${bottomInset}px`;
    },
  },
  rootAndroid: {
    padding: ({topInset, bottomInset, header}) => {
      return `${topInset + (header ? 56 : 0)}px 0 ${bottomInset}px`;
    },
  },
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

export const Panel = memo((props: PanelProps) => {
  const {
    className, component: Component, children, header, isSuspended, ...rest
  } = props;
  const {top, bottom} = useInsets();
  const os = useOS();
  const mc = useStyles({
    ...props,
    header,
    topInset: top,
    bottomInset: bottom,
  });
  let content: ReactNode | ReactNodeArray = null;

  if (Component && children) {
    throw new Error(
      'It is not allowed to pass "component" and "children" props in ' +
      'Panel at the same time',
    );
  }

  if (Component) {
    content = <Component isSuspended={isSuspended}/>;
  } else if (children) {
    const childrenArr = Array.isArray(children) ? children : [children];

    content = childrenArr.map((c, idx) => {
      return cloneElement(c, {
        ...c.props,
        key: idx,
        // Avoid passing isSuspended prop to non-React component types
        isSuspended: typeof c.type === 'string' ? undefined : isSuspended,
      });
    });
  }

  const isAndroid = os === OS.Android;
  const rootClassName = c(
    className,
    mc.root,
    {[mc.rootAndroid]: isAndroid},
  );
  const separatorClassName = c(mc.separator, {
    [mc.separatorAndroid]: isAndroid,
  });

  return (
    <div className={rootClassName} {...rest}>
      <Separator className={separatorClassName}/>
      {content}
    </div>
  );
});
