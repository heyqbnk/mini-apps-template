import React, {memo} from 'react';
import c from 'classnames';

import {makeStyles} from '@material-ui/styles';
import {Theme} from '../../theme';

import {Suspend} from '../Suspend';

import {useInsets} from '../../hooks';
import {useRouter} from '../Router';

import {ViewProps} from './types';

interface UseStylesProps extends ViewProps {
  topInset: number;
  bottomInset: number;
}

const useStyles = makeStyles<Theme, UseStylesProps>(() => ({
  root: {
    height: '100%',
    width: '100%',
  },
}), {name: 'View'});

export const View = memo((props: ViewProps) => {
  const {children, className, isSuspended, ...rest} = props;
  const {top, bottom} = useInsets();
  const {currentState} = useRouter();
  const mc = useStyles({...props, topInset: top, bottomInset: bottom});
  const _className = c(mc.root, className);

  return (
    <div className={_className} {...rest}>
      <Suspend activeElement={currentState.panel}>{children}</Suspend>
    </div>
  );
});
