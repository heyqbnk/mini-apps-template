import {
  SuspendableOptionalProps,
  SuspendableComponentProps,
  SuspendComponentType,
} from '../Suspend';
import {ComponentType, HTMLAttributes} from 'react';
import {OS} from '../../types';

export interface PanelProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'id' | 'children'>,
    SuspendableComponentProps {
  /**
   * Does panel contains header
   */
  header?: boolean;
  /**
   * Component which should be rendered inside panel
   */
  component?: ComponentType<SuspendableOptionalProps>;
}

/**
 * CSS transition phase types
 */
export type PanelTransitionType = 'enter' | 'exit';

/**
 * Required CSS handler options
 */
export interface PanelCSSHandlerRequiredOptions {
  os: OS;
  componentType: SuspendComponentType;
}
