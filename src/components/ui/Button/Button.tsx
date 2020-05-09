import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import c from 'classnames';

import {makeStyles} from '@material-ui/styles';
import {Theme} from '../../../theme/types';

import {useDevice} from '../../providers/DeviceProvider';

import {OS} from '../../../types';
import {ButtonProps, Point, Ripple} from './types';

const TRANSPARENT_DURATION = 600;
const RIPPLE_DURATION = 600;

const useStyles = makeStyles<Theme, ButtonProps>(theme => ({
  root: ({variant = 'primary'}) => {
    const {
      colors: {borderColor, backgroundColor, foregroundColor},
    } = theme.components.Button[variant];

    return {
      appearance: 'none',
      alignItems: 'center',
      borderRadius: 10,
      border: `1px solid ${borderColor}`,
      backgroundColor,
      color: foregroundColor,
      display: 'inline-flex',
      justifyContent: 'center',
      padding: '0 16px',
      position: 'relative',
      overflow: 'hidden',
      textDecoration: 'none',
      '-webkit-appearance': 'none',

      '&:focus, &:active': {
        outline: 'none',
      },
    };
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
    backgroundColor: ({variant = 'primary'}) => {
      return theme.components.Button[variant].colors.rippleColor;
    },
    pointerEvents: 'none',
  },
  '@keyframes ripple-active': {
    from: {transform: 'scale(0)', opacity: 1},
    to: {transform: 'scale(1)', opacity: 0},
  },
}), {name: 'Button'});

/**
 * Button element
 * @type {React.NamedExoticComponent<ButtonProps>}
 */
export const Button = memo(function Button(props: ButtonProps) {
  const {
    before, after, children, className, variant, fullWidth,
    disabled, href, size = 'm', onTouchStart, onTouchMove, onClick, classes,
    ...rest
  } = props;
  const {os} = useDevice();
  const mc = useStyles(props);
  const [isActive, setIsActive] = useState(false);
  const transparentTimeoutRef = useRef<number | null>(null);

  const [ripples, setRipples] = useState<Ripple[]>([]);
  const ripplesRef = useRef(ripples);

  const touchStartRef = useRef<Point | null>(null);
  const rootRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
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

  // Enhance onTouchStart event
  const _onTouchStart = useCallback(
    (e: React.TouchEvent<HTMLButtonElement>) => {
      if (rootRef.current) {
        const touch = e.touches[0];
        const button = rootRef.current;
        const x = touch.pageX - button.offsetLeft - button.clientWidth / 2;
        const y = touch.pageY - button.offsetTop - button.clientWidth / 2;

        // In IOS make button transparent
        if (os === OS.IOS) {
          setIsActive(true);

          // Assign touchStartRef to know where this touch began. Required
          // to detect when transparent effect cancel required
          touchStartRef.current = {x, y};
        }

        // In Android launch a wave
        if (os === OS.Android && rootRef.current) {
          setRipples(ripples => {
            const ripple = {
              id: Math.random().toString(16).slice(-8),
              coords: {x, y},
              removeTimeoutId: window.setTimeout(() => {
                // Remove this ripple from mounted ripples array
                setRipples(ripples => ripples.filter(r => r !== ripple));
              }, RIPPLE_DURATION),
            };

            return [...ripples, ripple];
          });
        }
      }

      // Call parent callback if defined
      if (onTouchStart) {
        onTouchStart(e);
      }
    },
    [onTouchStart, os],
  );

  // Enhance onTouchMove event
  const _onTouchMove = useCallback(
    (e: React.TouchEvent<HTMLButtonElement>) => {
      if (
        os === OS.IOS
        && rootRef.current
        && touchStartRef.current
        && isActive
      ) {
        // If touch was moved for more than 5 pixels, instantly cancel
        // transparent effect
        const touch = e.touches[0];
        const button = rootRef.current;
        const touchStart = touchStartRef.current;
        const x = touch.pageX - button.offsetLeft - button.clientWidth / 2;
        const y = touch.pageY - button.offsetTop - button.clientWidth / 2;

        if (Math.abs(touchStart.x - x) + Math.abs(touchStart.y - y) > 5) {
          setIsActive(false);
        }
      }

      // Call parent callback if defined
      if (onTouchMove) {
        onTouchMove(e);
      }
    },
    [onTouchMove, os, isActive],
  );

  // Enhance onClick event
  const _onClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (os === OS.IOS && isActive) {
      transparentTimeoutRef.current = window.setTimeout(() => {
        setIsActive(false);
      }, TRANSPARENT_DURATION);
    }

    // Call parent callback if defined
    if (onClick) {
      onClick(e);
    }
  }, [onClick, os, isActive]);

  // Reassign ripples ref every time they change
  useEffect(() => {
    ripplesRef.current = ripples;
  }, [ripples]);

  // Cleanup all ripples and transparent effect on unmount
  useEffect(() => {
    return () => {
      // We use ref trick because there is no pure componentWillUnmount
      // effect. It allows us not to pass ripples as a dependency. We are
      // doing it, because there is no other correct algorithm we could use
      ripplesRef.current.forEach(r => {
        if (r.removeTimeoutId) {
          clearTimeout(r.removeTimeoutId);
        }
      });

      if (transparentTimeoutRef.current) {
        clearTimeout(transparentTimeoutRef.current);
      }
    };
  }, []);

  return React.createElement(
    href ? 'a' : 'button',
    {
      ...rest,
      className: rootClassName,
      disabled,
      ref: rootRef,
      onTouchStart: _onTouchStart,
      onTouchMove: _onTouchMove,
      onClick: _onClick,
      href,
      // We add _blank because Android does not correctly opens links which dont
      // have this attribute
      target: href ? '_blank' : undefined,
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
