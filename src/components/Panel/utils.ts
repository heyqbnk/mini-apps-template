import {CreateCSSProperties, CSSProperties} from '@material-ui/styles';
import {OS} from '../../types';
import {SuspendComponentType} from '../Suspend';

export const PANEL_TRANSITION_DURATION_IOS = 600;
// TODO: Android options
export const PANEL_TRANSITION_DURATION_ANDROID = 600;
export const PANEL_TRANSITION_TIMING_FUNCTION_IOS = 'cubic-bezier(.36,.66,.04,1)';
// TODO: Move to theme
export const PANEL_SUSPENDER_COLOR = 'rgba(0,0,0,.5)';
export const PANEL_SUSPENDER_ENTER_TIMING_FUNCTION = 'cubic-bezier(0, 0.69, 0.28, 0.99)';
export const PANEL_SUSPENDER_EXIT_TIMING_FUNCTION = 'linear';

/**
 * Returns base transition CSS-properties for IOS
 * @param {SuspendComponentType} componentType
 * @param {"enter" | "exit"} transitionType
 * @returns {CreateCSSProperties}
 */
function getIOSTransitionBaseCSS(
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
      + PANEL_TRANSITION_TIMING_FUNCTION_IOS,
    transform,

    '&:before': componentType === 'side' ? {} : {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: transitionType === 'enter'
        ? PANEL_SUSPENDER_COLOR
        : 'transparent',
      zIndex: 1,
      transitionDuration: `${PANEL_TRANSITION_DURATION_IOS}ms`,
      transitionProperty: 'background-color',
      transitionTimingFunction: transitionType === 'enter'
        ? PANEL_SUSPENDER_ENTER_TIMING_FUNCTION
        : PANEL_SUSPENDER_EXIT_TIMING_FUNCTION,
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
  componentType: SuspendComponentType,
  transitionType: 'enter' | 'exit',
): CreateCSSProperties {
  return {};
}

/**
 * Returns base transition CSS-properties
 * @param {OS} os
 * @param {SuspendComponentType} componentType
 * @param {"enter" | "exit"} transitionType
 * @returns {CreateCSSProperties}
 */
export function getTransitionBaseCSS(
  os: OS,
  componentType: SuspendComponentType,
  transitionType: 'enter' | 'exit',
): CreateCSSProperties {
  if (os === OS.IOS) {
    return getIOSTransitionBaseCSS(componentType, transitionType);
  }
  return getAndroidTransitionBaseCSS(componentType, transitionType);
}

/**
 * Returns CSS for active phase of transition
 * @param {SuspendComponentType} componentType
 * @param {"enter" | "exit"} transitionType
 * @returns {CreateCSSProperties}
 */
export function getTransitionActiveCSS(
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
        ? (transitionType === 'enter' ? 'transparent' : PANEL_SUSPENDER_COLOR)
        : undefined,
    },
  };
}
