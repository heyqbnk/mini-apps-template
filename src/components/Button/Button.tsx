import React, {
  ButtonHTMLAttributes,
  memo,
  ReactNode,
  useCallback,
  useState,
  MouseEvent, useEffect, useRef,
} from 'react';
import c from 'classnames';

import {makeStyles, useTheme} from '@material-ui/styles';
import {ButtonColor, ButtonColorType, Theme} from '../../theme';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  before?: ReactNode;
  after?: ReactNode;
  color?: ButtonColorType;
  href?: string;
  fullWidth?: boolean;
  size?: 'm' | 'l' | 'xl';
}

interface UseStylesProps extends ButtonProps {
  themeColor: ButtonColor;
}

const useStyles = makeStyles<Theme, UseStylesProps>(theme => ({
  root: {
    appearance: 'none',
    alignItems: 'center',
    borderRadius: 10,
    border: ({themeColor}) => `1px solid ${themeColor.borderColor}`,
    backgroundColor: ({themeColor}) => themeColor.backgroundColor,
    color: ({themeColor}) => themeColor.foregroundColor,
    display: 'inline-flex',
    justifyContent: 'center',
    padding: '0 16px',
    textDecoration: 'none',
    '-webkit-appearance': 'none',

    '&:focus, &:active': {
      outline: 'none',
    },
    '&:active': {
      opacity: .5,
    }
  },
  active: {
    opacity: .5,
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    background: 'linear-gradient(180deg, #DFDCDC 0%, #CFCCCC 100%)',
    color: 'white',
  },
  before: {
    marginRight: 7,
  },
  beforeEmpty: {
    marginRight: 0,
  },
  after: {
    marginLeft: 7,
  },
  afterEmpty: {
    marginLeft: 0,
  },
  content: {
    fontFamily: theme.typography.fontFamily,
    fontWeight: 500,
  },
  contentM: {
    fontSize: 14,
    padding: '7px 0',
    lineHeight: '14px',
  },
  contentL: {
    fontSize: 15,
    padding: '8px 0',
  },
  contentXL: {
    fontSize: 17,
    padding: '11px 0',
  },
}));

/**
 * Button element
 * @type {React.NamedExoticComponent<ButtonProps>}
 */
export const Button = memo((props: ButtonProps) => {
  const {
    before, after, children, className, color = 'primary', fullWidth, disabled,
    href, size = 'm', onClick, ...rest
  } = props;
  const theme = useTheme<Theme>();
  const mc = useStyles({
    ...props,
    themeColor: theme.components.Button.colors[color],
  });
  const [isActive, setIsActive] = useState(false);
  const transparentTimeoutRef = useRef<number | null>(null);

  const rootClassName = c(
    className,
    mc.root,
    {
      [mc.fullWidth]: fullWidth,
      [mc.disabled]: disabled,
      [mc.active]: isActive,
    },
  );
  const contentClassName = c(
    mc.content,
    mc[`content${size.toUpperCase()}`],
  );

  // Rewire onClick
  const _onClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    setIsActive(true);

    if (onClick) {
      onClick(e);
    }
  }, [onClick]);

  // When component became transparent, it is required to make opaque it again
  // after some timeout
  useEffect(() => {
    if (isActive) {
      // Remove previous timeout
      if (transparentTimeoutRef.current) {
        clearTimeout(transparentTimeoutRef.current);
      }

      // Create new timeout
      transparentTimeoutRef.current = window.setTimeout(() => {
        setIsActive(false);
      }, 600);

      // Cleanup on timeout
      return () => {
        if (transparentTimeoutRef.current) {
          clearTimeout(transparentTimeoutRef.current);
        }
      };
    }
  }, [isActive]);

  // TODO: Waves in Android version on secondary design

  return React.createElement(
    href ? 'a' : 'button',
    {
      ...rest,
      className: rootClassName,
      disabled,
      onClick: _onClick,
      href,
      // We add _blank because Android does not correctly opens links which dont
      // have this attribute
      target: href ? '_blank' : undefined,
      // Add rel due to security reasons
      rel: href ? 'noopener nofollow noreferrer' : undefined,
    },
    <div className={c(mc.before, {[mc.beforeEmpty]: !before})}>{before}</div>,
    <div className={contentClassName}>{children}</div>,
    <div className={c(mc.after, {[mc.afterEmpty]: !after})}>{after}</div>,
  );
});
