import {
  VIEW_TRANSITION_IOS_DURATION,
  VIEW_TRANSITION_ANDROID_DURATION,
  VIEW_TRANSITION_ANDROID_TOP,
  VIEW_TRANSITION_ANDROID_LEFT,
} from './constants';

import {CreateCSSProperties} from '@material-ui/styles';
import {OS} from '../../../types';
import {SuspendComponentType} from '../Suspend';
import {Theme} from '../../../theme/types';
import {
  SuspendTransitionStartPhaseType,
  PhaseTransitionHandlerGenerator,
} from '../SuspendTransition';

/**
 * Returns base transition CSS-properties for IOS
 * @returns {CreateCSSProperties}
 * @param theme
 * @param componentType
 * @param phase
 */
function getIOSTransitionBaseCSS(
  theme: Theme,
  componentType: SuspendComponentType,
  phase: SuspendTransitionStartPhaseType,
): CreateCSSProperties {
  const isEnter = phase === 'enter';
  const isMain = componentType === 'main';

  if (isMain) {
    return {
      position: 'relative',
      pointerEvents: 'none',

      '&:before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        transition: `${VIEW_TRANSITION_IOS_DURATION}ms `
          + (isEnter ? 'cubic-bezier(0, 0.69, 0.28, 0.99) ' : 'linear ')
          + 'background-color',
        backgroundColor: isEnter
          ? theme.components.View.suspenderColor
          : 'transparent',
      },
    };
  }

  return {
    position: 'absolute',
    top: isEnter ? '100%' : 0,
    transform: 'translateY(0)',
    pointerEvents: 'none',
    transitionDuration: `${VIEW_TRANSITION_IOS_DURATION}ms`,
    transitionTimingFunction: 'cubic-bezier(0.47, 0.91, 0.43, 0.94)',
    transitionProperty: 'transform, opacity',
    zIndex: 2,
  };
}

/**
 * Returns base transition CSS-properties for Android
 * @param theme
 * @param componentType
 * @param phase
 * @returns {CreateCSSProperties}
 */
function getAndroidTransitionBaseCSS(
  theme: Theme,
  componentType: SuspendComponentType,
  phase: SuspendTransitionStartPhaseType,
): CreateCSSProperties {
  const isEnter = phase === 'enter';
  const isMain = componentType === 'main';

  if (isMain) {
    return {
      pointerEvents: 'none',
    };
  }

  return {
    position: 'absolute',
    top: 0,
    left: 0,
    transform: `translate(${
      isEnter ? (isMain ? 0 : VIEW_TRANSITION_ANDROID_LEFT) : 0
    }px, ${
      isEnter ? (isMain ? 0 : VIEW_TRANSITION_ANDROID_TOP) : 0
    }px)`,
    opacity: isEnter ? 0 : 1,
    pointerEvents: 'none',
    transitionDuration: `${VIEW_TRANSITION_ANDROID_DURATION}ms`,
    transitionTimingFunction: 'cubic-bezier(0.47, 0.91, 0.64, 0.98)',
    transitionProperty: 'transform, opacity',
  };
}

/**
 * Creates handler which returns base transition CSS-properties
 * @param {Theme} theme
 * @param {SuspendTransitionStartPhaseType} phase
 * @returns {(options: T) => CreateCSSProperties<{}>}
 */
export const createStartPhaseTransitionHandler: PhaseTransitionHandlerGenerator =
  (theme, phase) => {
    return options => {
      const {os, componentType} = options;

      if (os === OS.IOS) {
        return getIOSTransitionBaseCSS(theme, componentType, phase);
      }
      return getAndroidTransitionBaseCSS(theme, componentType, phase);
    };
  };

/**
 * Returns CSS for active phase of IOS transition
 * @param {Theme} theme
 * @param {SuspendComponentType} componentType
 * @param {"enter" | "exit"} phase
 * @returns {CreateCSSProperties}
 */
function getIOSTransitionActivePhaseCSS(
  theme: Theme,
  componentType: SuspendComponentType,
  phase: SuspendTransitionStartPhaseType,
): CreateCSSProperties {
  const isEnter = phase === 'enter';
  const isMain = componentType === 'main';

  if (isMain) {
    return {
      '&:before': {
        backgroundColor: isEnter
          ? 'transparent'
          : theme.components.View.suspenderColor,
      },
    };
  }

  return {
    transform: `translateY(${isEnter ? '-100%' : '100%'})`,
  };
}

/**
 * Returns CSS for active phase of Android transition
 * @param {Theme} theme
 * @param {SuspendComponentType} componentType
 * @param {"enter" | "exit"} phase
 * @returns {CreateCSSProperties}
 */
function getAndroidTransitionActivePhaseCSS(
  theme: Theme,
  componentType: SuspendComponentType,
  phase: SuspendTransitionStartPhaseType,
): CreateCSSProperties {
  const isEnter = phase === 'enter';
  const isMain = componentType === 'main';

  if (isMain) {
    return {};
  }

  return {
    transform: `translate(${
      isEnter ? 0 : VIEW_TRANSITION_ANDROID_LEFT
    }px, ${
      isEnter ? 0 : VIEW_TRANSITION_ANDROID_TOP
    }px)`,
    opacity: isEnter ? 1 : 0,
  };
}

/**
 * Creates handler which returns CSS for active phase of transition
 * @param {Theme} theme
 * @param {SuspendTransitionStartPhaseType} phase
 * @returns {(options: T) => CreateCSSProperties<{}>}
 */
export const createActivePhaseTransitionHandler: PhaseTransitionHandlerGenerator =
  (theme, phase) => {
    return options => {
      const {os, componentType} = options;

      if (os === OS.IOS) {
        return getIOSTransitionActivePhaseCSS(theme, componentType, phase);
      }
      return getAndroidTransitionActivePhaseCSS(theme, componentType, phase);
    };
  };
