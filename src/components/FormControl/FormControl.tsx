import React, {memo} from 'react';
import c from 'classnames';

import {makeStyles} from '@material-ui/styles';
import {Theme} from '../../theme';

import {useOS} from '../../hooks';

import {FormControlProps} from './types';
import {OS} from '../../types';

const useStyles = makeStyles<Theme, FormControlProps>(theme => {
  const {colors} = theme.components.FormControl;

  return {
    root: {
      backgroundColor: colors.background,
      border: `1px solid ${colors.border}`,
      borderRadius: 10,
      boxSizing: 'border-box',
      fontSize: 16,
      fontFamily: theme.typography.fontFamily,
      position: 'relative',
    },
    rootAndroid: {
      borderRadius: 8,
    },
    rootFocused: {
      borderColor: colors.borderFocused,
    },
  };
}, {name: 'FormControl'});

export const FormControl = memo((props: FormControlProps) => {
  const {className, children, isFocused, ...rest} = props;
  const os = useOS();
  const mc = useStyles(props);

  const rootClassName = c(mc.root, className, {
    [mc.rootFocused]: isFocused,
    [mc.rootAndroid]: os === OS.Android,
  });

  return <div className={rootClassName} {...rest}>{children}</div>;
});
