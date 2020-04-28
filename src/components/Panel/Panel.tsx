import React, {cloneElement, memo, ReactNode, ReactNodeArray} from 'react';
import c from 'classnames';

import {makeStyles} from '@material-ui/styles';
import {Theme} from '../../theme';

import {useInsets} from '../../hooks/useInsets';
import {useOS} from '../../hooks/useOS';

import {OS} from '../../types';
import {PanelProps} from './types';

interface UseStylesProps extends PanelProps {
  topInset: number;
  bottomInset: number;
  os: OS;
}

const useStyles = makeStyles<Theme, UseStylesProps>(() => ({
  root: {
    height: '100%',
    boxSizing: 'border-box',
    paddingTop: ({topInset, header, os}) => {
      let padding = topInset;

      if (header) {
        padding += os === OS.IOS ? 52 : 56;
      }

      return padding;
    },
    paddingBottom: ({bottomInset}) => bottomInset,
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
    os,
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

  return <div className={c(mc.root, className)} {...rest}>{content}</div>;
});
