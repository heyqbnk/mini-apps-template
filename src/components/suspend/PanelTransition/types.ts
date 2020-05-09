import {SuspendComponentType} from '../Suspend';
import {OS} from '../../../types';
import {
  SuspendTransitionWrapperContext,
  SuspendTransitionWrapperProps,
} from '../SuspendTransition';

export type PanelTransitionProps = SuspendTransitionWrapperProps;

/**
 * Required CSS handler options
 */
export interface PanelCSSHandlerRequiredOptions {
  os: OS;
  componentType: SuspendComponentType;
}

export type PanelTransitionContext = SuspendTransitionWrapperContext;
