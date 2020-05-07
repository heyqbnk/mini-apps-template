import {ClassicElement, HTMLAttributes} from 'react';
import {SuspendableComponentProps, SuspendComponentType} from '../Suspend';
import {PanelProps} from '../Panel';
import {OS} from '../../types';

export interface ViewProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'id'>,
    SuspendableComponentProps {
  /**
   * Panels array
   */
  children: ClassicElement<PanelProps> | ClassicElement<PanelProps>[];
  /**
   * Currently active panel
   */
  activePanel: string;
}

/**
 * CSS transition phase types
 */
export type ViewTransitionType = 'enter' | 'exit';

/**
 * Required CSS handler options
 */
export interface ViewCSSHandlerRequiredOptions {
  os: OS;
  componentType: SuspendComponentType;
}
