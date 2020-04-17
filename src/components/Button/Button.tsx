import React, {ButtonHTMLAttributes, memo, ReactNode} from 'react';
import c from 'classnames';

import {makeStyles} from '@material-ui/styles';
import {Theme} from '../../theme/types';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  before?: ReactNode;
  after?: ReactNode;
  variant?: 'filled' | 'outline' | 'text';
  href?: string;
  fullWidth?: boolean;
}

const useStyles = makeStyles<Theme, ButtonProps>(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
    padding: '11px 15px',
    letterSpacing: -0.408,
    fontSize: 17,
    lineHeight: '22px',
    fontWeight: theme.typography.fontWeightMedium,
    background: 'none',
    border: 'none',
    textDecoration: 'none',
    boxSizing: 'border-box',

    '&:focus, &:active': {
      outline: 'none',
    },
  },
  fullWidth: {
    width: '100%',
  },
  filled: {
    color: 'black',
    background: `linear-gradient(180deg, ${theme.palette.primary.main} 0%, `
      + `${theme.palette.primary.dark} 100%)`,
  },
  outline: {
    color: theme.palette.primary.dark,
    border: `1.4px solid ${theme.palette.primary.dark}`,
  },
  text: {
    color: theme.palette.primary.dark,
  },
  disabled: {
    background: 'linear-gradient(180deg, #DFDCDC 0%, #CFCCCC 100%)',
    color: 'white',
  },
  before: {},
  after: {},
  content: {},
}));

/**
 * Button element
 * @type {React.NamedExoticComponent<ButtonProps>}
 */
export const Button = memo((props: ButtonProps) => {
  const {
    before, after, children, className, variant = 'filled', fullWidth, disabled,
    href, ...rest
  } = props;
  const mc = useStyles(props);
  const computedClassName = c(
    className,
    mc.root,
    mc[variant],
    {
      [mc.fullWidth]: fullWidth,
      [mc.disabled]: disabled,
    },
  );

  return React.createElement(
    href ? 'a' : 'button',
    {
      ...rest,
      className: computedClassName,
      disabled,
      href,
    },
    <div className={mc.before}>
      {before}
    </div>,
    <div className={mc.content}>
      {children}
    </div>,
    <div className={mc.after}>
      {after}
    </div>,
  );
});
