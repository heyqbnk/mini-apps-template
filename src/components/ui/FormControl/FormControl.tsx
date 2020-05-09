import React, {memo} from 'react';
import c from 'classnames';

import {makeStyles} from '@material-ui/styles';
import {Theme} from '../../../theme';

import{useDevice} from '../../providers/DeviceProvider';

import {FormControlProps} from './types';
import {OS} from '../../../types';

const useStyles = makeStyles<Theme, FormControlProps>(theme => {
  const {
    borderColor, borderFocusedColor, backgroundColor,
  } = theme.components.FormControl;

  return {
    root: {
      backgroundColor,
      border: `1px solid ${borderColor}`,
      borderRadius: 10,
      boxSizing: 'border-box',
      fontSize: 16,
      fontFamily: theme.typography.fontFamily,
      position: 'relative',
    },
    rootAndroid: {
      borderRadius: 8,
    },
    focused: {
      borderColor: borderFocusedColor,
    },
  };
}, {name: 'FormControl'});

export const FormControl = memo(function FormControl(props: FormControlProps) {
  const {className, children, isFocused, ...rest} = props;
  const {os} = useDevice();
  const mc = useStyles(props);

  const rootClassName = c(mc.root, className, {
    [mc.focused]: isFocused,
    [mc.rootAndroid]: os === OS.Android,
  });

  return <div className={rootClassName} {...rest}>{children}</div>;
});
