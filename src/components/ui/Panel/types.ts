import {SuspendableComponentProps} from '../../suspend/Suspend';
import {ComponentType, HTMLAttributes} from 'react';

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
  component?: ComponentType;
}
