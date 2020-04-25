import React, {memo, HTMLAttributes} from 'react';
import c from 'classnames';

import {makeStyles, useTheme} from '@material-ui/styles';
import {Theme, FormControlTheme} from '../../theme';

interface Props extends HTMLAttributes<HTMLDivElement> {
  isFocused?: boolean;
}

interface UseStylesProps extends Props {
  theme: FormControlTheme;
}

// TODO: Differs a bit with Android version
const useStyles = makeStyles<Theme, UseStylesProps>(theme => ({
  root: {
    backgroundColor: ({theme}) => theme.colors.background,
    border: ({theme}) => `1px solid ${theme.colors.border}`,
    borderRadius: 10,
    boxSizing: 'border-box',
    fontSize: 16,
    fontFamily: theme.typography.fontFamily,
    position: 'relative',
  },
  rootFocused: {
    borderColor: ({theme}) => theme.colors.borderFocused,
  },
}), {name: 'FormControl'});

export const FormControl = memo((props: Props) => {
  const {className, children, isFocused, ...rest} = props;
  const theme = useTheme<Theme>();
  const mc = useStyles({...props, theme: theme.components.FormControl});

  const rootClassName = c(mc.root, className, {[mc.rootFocused]: isFocused});

  return <div className={rootClassName} {...rest}>{children}</div>;
});
