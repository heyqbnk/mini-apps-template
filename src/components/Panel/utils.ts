import {PANEL_TRANSITION_DURATION_IOS} from './constants';

import {CreateCSSProperties} from '@material-ui/styles';
import {OS} from '../../types';
import {SuspendComponentType} from '../Suspend';
import {Theme} from '../../theme/types';

/**
 * Returns base transition CSS-properties for IOS
 * @returns {CreateCSSProperties}
 * @param theme
 * @param componentType
 * @param transitionType
 */
function getIOSTransitionBaseCSS(
  theme: Theme,
  componentType: SuspendComponentType,
  transitionType: 'enter' | 'exit',
): CreateCSSProperties {
  const transform = componentType === 'main'
    ? 'translateX(-100%)'
    : 'translateX(100%)';

  return {
    position: 'absolute',
    left: 0,
    top: 0,
    pointerEvents: 'none',
    transition: `${PANEL_TRANSITION_DURATION_IOS}ms all `
      + 'cubic-bezier(.36,.66,.04,1)',
    transform,

    '&:before': componentType === 'side' ? {} : {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: transitionType === 'enter'
        ? theme.components.Panel.suspenderColor
        : 'transparent',
      zIndex: 1,
      transitionDuration: `${PANEL_TRANSITION_DURATION_IOS}ms`,
      transitionProperty: 'background-color',
      transitionTimingFunction: transitionType === 'enter'
        ? 'cubic-bezier(0, 0.69, 0.28, 0.99)'
        : 'linear',
    },
  };
}

/**
 * Returns base transition CSS-properties for Android
 * @param {SuspendComponentType} componentType
 * @param {"enter" | "exit"} transitionType
 * @returns {CreateCSSProperties}
 */
function getAndroidTransitionBaseCSS(
  theme: Theme,
  componentType: SuspendComponentType,
  transitionType: 'enter' | 'exit',
): CreateCSSProperties {
  return {};
}

/**
 * Returns base transition CSS-properties
 * @param {OS} os
 * @param theme
 * @param componentType
 * @param transitionType
 * @returns {CreateCSSProperties}
 */
export function getTransitionBaseCSS(
  theme: Theme,
  os: OS,
  componentType: SuspendComponentType,
  transitionType: 'enter' | 'exit',
): CreateCSSProperties {
  if (os === OS.IOS) {
    return getIOSTransitionBaseCSS(theme, componentType, transitionType);
  }
  return getAndroidTransitionBaseCSS(theme, componentType, transitionType);
}

/**
 * Returns CSS for active phase of transition
 * @param theme
 * @param {SuspendComponentType} componentType
 * @param {"enter" | "exit"} transitionType
 * @returns {CreateCSSProperties}
 */
export function getTransitionActiveCSS(
  theme: Theme,
  componentType: SuspendComponentType,
  transitionType: 'enter' | 'exit',
): CreateCSSProperties {
  return {
    transform: transitionType === 'enter'
      ? 'translateX(0)'
      : (
        componentType === 'main'
          ? 'translateX(-100%)'
          : 'translateX(100%)'
      ),

    '&:before': {
      backgroundColor: componentType === 'main'
        ? (transitionType === 'enter'
          ? 'transparent'
          : theme.components.Panel.suspenderColor)
        : undefined,
    },
  };
}
