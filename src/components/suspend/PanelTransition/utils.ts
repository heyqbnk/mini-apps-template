import {
  PANEL_TRANSITION_ANDROID_DURATION,
  PANEL_TRANSITION_ANDROID_TOP,
  PANEL_TRANSITION_IOS_DURATION,
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
  const shared: CreateCSSProperties = {
    position: 'absolute',
    left: 0,
    top: 0,
    pointerEvents: 'none',
    transition: `${PANEL_TRANSITION_IOS_DURATION}ms all `
      + 'cubic-bezier(.36,.66,.04,1)',
  };

  if (isMain) {
    return {
      ...shared,
      transform: `translateX(${isEnter ? '-100%' : 0})`,

      '&:before': {
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
      },
    };
  }

  return {
    ...shared,
    transform: `translateX(${isEnter ? '100%' : 0})`,
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
    top: isEnter ? PANEL_TRANSITION_ANDROID_TOP : 0,
    transform: 'translateY(0)',
    pointerEvents: 'none',
    transitionDuration: `${PANEL_TRANSITION_ANDROID_DURATION}ms`,
    transitionTimingFunction: 'cubic-bezier(0.47, 0.91, 0.68, 1.02)',
    transitionProperty: 'transform, opacity',
    zIndex: 2,
    opacity: isEnter ? 0 : 1,
    left: 0,
  };
}

/**
 * Creates handler which returns base transition CSS-properties
 * @param {Theme} theme
 * @param {SuspendTransitionStartPhaseType} phase
 * @returns {(options) => CreateCSSProperties<{}>}
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
      transform: `translateX(${isEnter ? 0 : '-100%'})`,

      '&:before': {
        backgroundColor: isEnter
          ? 'transparent'
          : theme.components.Panel.suspenderColor,
      },
    };
  }

  return {
    transform: `translateX(${isEnter ? 0 : '100%'})`,
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
    transform: `translateY(${
      (isEnter ? -1 : 1) * PANEL_TRANSITION_ANDROID_TOP
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
