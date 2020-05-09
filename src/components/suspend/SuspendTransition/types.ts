import {SuspendableRequiredProps} from '../Suspend';
import {ReactElement} from 'react';
import {ClassNameMap} from '@material-ui/styles';

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
}

/**
 * Props for components which want to extend SuspendTransition
 */
export interface SuspendTransitionWrapperProps
  extends SuspendableRequiredProps {
  /**
   * Children which can accept className property
   */
  children: ReactElement<{ className?: string }>;
}

/**
 * Context for wrappers which realises SuspendTransition
 */
export type SuspendTransitionWrapperContext = SuspendableRequiredProps;
