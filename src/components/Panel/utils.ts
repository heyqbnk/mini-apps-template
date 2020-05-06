import {
  PANEL_TRANSITION_ANDROID_DURATION, PANEL_TRANSITION_ANDROID_TOP,
  PANEL_TRANSITION_IOS_DURATION,
} from './constants';

import {CreateCSSProperties} from '@material-ui/styles';
import {OS} from '../../types';
import {SuspendComponentType} from '../Suspend';
import {Theme} from '../../theme/types';
import {PanelCSSHandlerRequiredOptions, PanelTransitionType} from './types';

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
  transitionType: PanelTransitionType,
): CreateCSSProperties {
  const isEnter = transitionType === 'enter';
  const isMain = componentType === 'main';

  return {
    position: 'absolute',
    left: 0,
    top: 0,
    pointerEvents: 'none',
    transition: `${PANEL_TRANSITION_IOS_DURATION}ms all `
      + 'cubic-bezier(.36,.66,.04,1)',
    transform: isEnter
      ? (isMain ? 'translateX(-100%)' : 'translateX(100%)')
      : 'translateX(0)',

    '&:before': isMain ? {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: isEnter
        ? theme.components.Panel.suspenderColor
        : 'transparent',
      zIndex: 1,
      transition: `${PANEL_TRANSITION_IOS_DURATION}ms `
        + (isEnter ? 'cubic-bezier(0, 0.69, 0.28, 0.99) ' : 'linear ')
        + 'background-color',
    } : {},
  };
}

/**
 * Returns base transition CSS-properties for Android
 * @param theme
 * @param componentType
 * @param transitionType
 * @returns {CreateCSSProperties}
 */
function getAndroidTransitionBaseCSS(
  theme: Theme,
  componentType: SuspendComponentType,
  transitionType: PanelTransitionType,
): CreateCSSProperties {
  const isEnter = transitionType === 'enter';
  const isMain = componentType === 'main';

  return {
    position: 'absolute',
    top: isEnter ? (isMain ? 0 : PANEL_TRANSITION_ANDROID_TOP) : 0,
    opacity: isEnter ? (isMain ? 1 : 0) : 1,
    left: 0,
    pointerEvents: 'none',
    transition: `${PANEL_TRANSITION_ANDROID_DURATION}ms all `
      + 'cubic-bezier(0.47, 0.91, 0.68, 1.02)',
  };
}

/**
 * Creates handler which returns base transition CSS-properties
 * @param {Theme} theme
 * @param {PanelTransitionType} transitionType
 * @returns {(options: T) => CreateCSSProperties<{}>}
 */
export function createStartTransitionHandler<T extends PanelCSSHandlerRequiredOptions>(
  theme: Theme,
  transitionType: PanelTransitionType,
) {
  return (options: T) => {
    const {os, componentType} = options;

    if (os === OS.IOS) {
      return getIOSTransitionBaseCSS(theme, componentType, transitionType);
    }
    return getAndroidTransitionBaseCSS(theme, componentType, transitionType);
  };
}

/**
 * Returns CSS for active phase of IOS transition
 * @param {Theme} theme
 * @param {SuspendComponentType} componentType
 * @param {"enter" | "exit"} transitionType
 * @returns {CreateCSSProperties}
 */
function getIOSTransitionActiveCSS(
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

/**
 * Returns CSS for active phase of Android transition
 * @param {Theme} theme
 * @param {SuspendComponentType} componentType
 * @param {"enter" | "exit"} transitionType
 * @returns {CreateCSSProperties}
 */
function getAndroidTransitionActiveCSS(
  theme: Theme,
  componentType: SuspendComponentType,
  transitionType: 'enter' | 'exit',
): CreateCSSProperties {
  const isEnter = transitionType === 'enter';
  const isMain = componentType === 'main';

  return {
    top: isEnter ? 0 : (isMain ? 0 : PANEL_TRANSITION_ANDROID_TOP),
    opacity: isEnter ? 1 : (isMain ? 1 : 0),
  };
}

/**
 * Creates handler which returns CSS for active phase of transition
 * @param {Theme} theme
 * @param {PanelTransitionType} transitionType
 * @returns {(options: T) => CreateCSSProperties<{}>}
 */
export function createActiveTransitionHandler<T extends PanelCSSHandlerRequiredOptions>(
  theme: Theme,
  transitionType: PanelTransitionType,
) {
  return (options: T) => {
    const {os, componentType} = options;

    if (os === OS.IOS) {
      return getIOSTransitionActiveCSS(theme, componentType, transitionType);
    }
    return getAndroidTransitionActiveCSS(theme, componentType, transitionType);
  };
}
