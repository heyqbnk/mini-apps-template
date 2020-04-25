import React, {
  memo,
  MouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import c from 'classnames';

import {makeStyles, useTheme} from '@material-ui/styles';

import useSelector from '../../hooks/useSelector';

import {OS} from '../../types';
import {ButtonColor, Theme} from '../../theme';
import {ButtonProps, Ripple} from './types';

interface UseStylesProps extends ButtonProps {
  themeColor: ButtonColor;
}

const RIPPLE_DURATION = 600;

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
    position: 'relative',
    textDecoration: 'none',
    '-webkit-appearance': 'none',

    '&:focus, &:active': {
      outline: 'none',
    },
  },
  rootIOS: {
    '&:active': {
      opacity: .5,
    },
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
    position: 'relative',
    zIndex: 1,
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
  rippleContainer: {
    position: 'absolute',
    top: -1,
    left: -1,
    bottom: -1,
    right: -1,
    zIndex: 0,
    pointerEvents: 'none',
    borderRadius: 10,
    overflow: 'hidden',
  },
  ripple: {
    position: 'absolute',
    width: '100%',
    paddingTop: '100%',
    animation: `$ripple-active ${RIPPLE_DURATION}ms`,
    borderRadius: '50%',
    backgroundColor: ({themeColor}) => themeColor.rippleColor,
    pointerEvents: 'none',
  },
  '@keyframes ripple-active': {
    from: {transform: 'scale(0)', opacity: 1},
    to: {transform: 'scale(1)', opacity: 0},
  },
}), {
  name: 'Button',
});

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
  const os = useSelector(state => state.device.os);
  const mc = useStyles({
    ...props,
    themeColor: theme.components.Button.colors[color],
  });
  const [isActive, setIsActive] = useState(false);
  const transparentTimeoutRef = useRef<number | null>(null);

  const [ripples, setRipples] = useState<Ripple[]>([]);
  const ripplesRef = useRef(ripples);
  const rootRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);

  const rootClassName = c(
    className,
    mc.root,
    {
      [mc.rootIOS]: os === OS.IOS,
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
    if (os === OS.IOS) {
      setIsActive(true);
    }

    if (os === OS.Android && rootRef.current) {
      const button = rootRef.current;
      e.persist();
      setRipples(ripples => [...ripples, {
        id: Math.random().toString(16).slice(-8),
        coords: {
          x: e.pageX - button.offsetLeft - button.clientWidth / 2,
          y: e.pageY - button.offsetTop - button.clientWidth / 2,
        },
        removeTimeoutId: null,
      }]);
    }

    if (onClick) {
      onClick(e);
    }
  }, [onClick, os]);

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

      // Cleanup on unmount
      return () => {
        if (transparentTimeoutRef.current) {
          clearTimeout(transparentTimeoutRef.current);
        }
      };
    }
  }, [isActive]);

  // When ripple was added we have to assign removeTimeoutId for it to remove
  // ripple after transition ended
  useEffect(() => {
    ripples.forEach(r => {
      if (r.removeTimeoutId === null) {
        r.removeTimeoutId = window.setTimeout(() => {
          // Remove this ripple from mounted ripples array
          setRipples(ripples => ripples.filter(ripple => ripple !== r));
        }, RIPPLE_DURATION)
      }
    });
  }, [ripples]);

  // Cleanup all ripples on unmount
  useEffect(() => {
    // We use ref trick because there is no pure componentWillUnmount
    // effect. It allows us not to pass ripples as a dependency. We are
    // doing it, because there is no other correct algorithm we could use
    ripplesRef.current.forEach(r => {
      if (r.removeTimeoutId) {
        clearTimeout(r.removeTimeoutId);
      }
    });
  }, []);

  return React.createElement(
    href ? 'a' : 'button',
    {
      ...rest,
      className: rootClassName,
      disabled,
      ref: rootRef,
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
    os === OS.Android ? (
      <div className={mc.rippleContainer}>
        {ripples.map(r => (
          <div
            className={mc.ripple}
            style={{top: r.coords.y, left: r.coords.x}}
            key={r.id}
          />
        ))}
      </div>
    ) : null,
  );
});
