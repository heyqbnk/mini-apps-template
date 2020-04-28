import React, {memo} from 'react';
import c from 'classnames';

import {makeStyles} from '@material-ui/styles';
import {Theme} from '../../theme';

import {useInsets} from '../../hooks/useInsets';
import {useOS} from '../../hooks/useOS';

import {OS} from '../../types';
import {PanelHeaderProps} from './types';

interface UseStylesProps extends PanelHeaderProps {
  topInset: number;
  os: OS;
}

const useStyles = makeStyles<Theme, UseStylesProps>(() => ({
  root: {
    position: 'fixed',
    left: 0,
    top: 0,
    width: '100%',
    height: ({os}) => os === OS.IOS ? 52 : 56,
    paddingTop: ({topInset}) => topInset,
  },
}), {name: 'PanelHeader'});

export const PanelHeader = memo((props: PanelHeaderProps) => {
  const {children, className, ...rest} = props;
  const {top} = useInsets();
  const os = useOS();
  const mc = useStyles({...props, topInset: top, os});
  const _className = c(mc.root, className);

  return <div className={_className} {...rest}>{children}</div>;
});
