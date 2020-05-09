import {SuspendComponentType} from '../Suspend';
import {OS} from '../../../types';
import {
  SuspendTransitionWrapperContext,
  SuspendTransitionWrapperProps,
} from '../SuspendTransition';

export type ViewTransitionProps = SuspendTransitionWrapperProps;

/**
 * Required CSS handler options
 */
export interface ViewCSSHandlerRequiredOptions {
  os: OS;
  componentType: SuspendComponentType;
}

export type ViewTransitionContext = SuspendTransitionWrapperContext;
