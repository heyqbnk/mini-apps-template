import {SuspendableRequiredProps, SuspendComponentType} from '../Suspend';
import {ReactElement} from 'react';
import {ClassNameMap, CreateCSSProperties} from '@material-ui/styles';
import {EnterHandler, ExitHandler} from 'react-transition-group/Transition';
import {OS} from '../../../types';
import {Theme} from '../../../theme/types';

/**
 * CSS transition start phase types
 */
export type SuspendTransitionStartPhaseType = 'enter' | 'exit';

export interface SuspendTransitionProps extends SuspendableRequiredProps {
  /**
   * Children which can accept className property
   */
  children: ReactElement<{ className?: string }>;

  /**
   * List of applied transition class names
   */
  classNames: ClassNameMap;

  /**
   * Transition duration in OS
   */
  iosTransitionDuration: number;

  /**
   * Transition duration on Android
   */
  androidTransitionDuration: number;

  /**
   * CSSTransition handlers
   */
  onEnter?: EnterHandler;
  onEntered?: EnterHandler;
  onExit?: ExitHandler;
  onExited?: ExitHandler;
}

export interface CreateTransitionComponentOptions {
  /**
   * Creates CSS generator for start phase of transition
   */
  createStartPhaseTransitionHandler: PhaseTransitionHandlerGenerator;

  /**
   * Creates CSS generator for active phase of transition
   */
  createActivePhaseTransitionHandler: PhaseTransitionHandlerGenerator;

  /**
   * Component display name
   */
  displayName: string;

  /**
   * Duration of transition in IOS
   */
  iosTransitionDuration: number;

  /**
   * Duration of transition in Android
   */
  androidTransitionDuration: number;
}

/**
 * Context created by custom transition component
 */
export interface CustomTransitionContext extends SuspendableRequiredProps {
  isTransitioning: boolean;
}

/**
 * Props required to create custom transition component
 */
export interface CustomTransitionProps extends SuspendableRequiredProps {
  children: ReactElement<{ className?: string }>;
}

/**
 * Options required for CSS phase handler
 */
interface CSSHandlerRequiredOptions {
  os: OS;
  componentType: SuspendComponentType;
}

/**
 * Returned by generator handler
 */
type PhaseTransitionHandler = (
  options: CSSHandlerRequiredOptions,
) => CreateCSSProperties;

/**
 * Type of generator which returns handler
 */
export type PhaseTransitionHandlerGenerator = (
  theme: Theme,
  phase: SuspendTransitionStartPhaseType,
) => PhaseTransitionHandler;
