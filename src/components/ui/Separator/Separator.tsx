import React, {memo} from 'react';
import c from 'classnames';

import {makeStyles} from '@material-ui/styles';
import {Theme} from '../../../theme/types';

import {SeparatorProps} from './types';

const useStyles = makeStyles<Theme, SeparatorProps>(theme => ({
  root: {
    padding: '0 12px',
    boxSizing: 'border-box',
  },
  rootAndroid: {
    padding: '0 16px',
  },
  fullWidth: {
    padding: 0,
  },
  in: {
    backgroundColor: theme.components.Separator.backgroundColor,
    height: 1,
  },
}), {name: 'Separator'});

export const Separator = memo(function Separator(props: SeparatorProps) {
  const {className, children, fullWidth, ...rest} = props;
  const mc = useStyles(props);
  const _className = c(className, mc.root, {[mc.fullWidth]: fullWidth});

  return (
    <div className={_className} {...rest}>
      <div className={mc.in}/>
      {children}
    </div>
  );
});
