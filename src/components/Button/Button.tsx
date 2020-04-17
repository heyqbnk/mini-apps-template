import React, {ButtonHTMLAttributes, memo, ReactNode} from 'react';
import c from 'classnames';

import {makeStyles, useTheme} from '@material-ui/styles';
import {ButtonColor, ButtonColorType, Theme} from '../../theme';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  before?: ReactNode;
  after?: ReactNode;
  color?: ButtonColorType;
  href?: string;
  fullWidth?: boolean;
}

interface UseStylesProps extends ButtonProps {
  settingsColor: ButtonColor;
}

const useStyles = makeStyles<Theme, UseStylesProps>(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    padding: '11px 15px',
    letterSpacing: -0.408,
    fontSize: 17,
    lineHeight: '22px',
    fontWeight: 500,
    background: 'none',
    border: 'none',
    textDecoration: 'none',
    boxSizing: 'border-box',
    color: ({settingsColor}) => settingsColor.foregroundColor,
    backgroundColor: ({settingsColor}) => settingsColor.backgroundColor,

    '&:focus, &:active': {
      outline: 'none',
    },
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    background: 'linear-gradient(180deg, #DFDCDC 0%, #CFCCCC 100%)',
    color: 'white',
  },
  before: {},
  after: {},
  content: {padding: '0 5px'},
}));

/**
 * Button element
 * @type {React.NamedExoticComponent<ButtonProps>}
 */
export const Button = memo((props: ButtonProps) => {
  const {
    before, after, children, className, color = 'primary', fullWidth, disabled,
    href, ...rest
  } = props;
  const theme = useTheme<Theme>();
  const mc = useStyles({
    ...props,
    settingsColor: theme.components.Button.colors[color],
  });
  const computedClassName = c(
    className,
    mc.root,
    {[mc.fullWidth]: fullWidth, [mc.disabled]: disabled},
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
