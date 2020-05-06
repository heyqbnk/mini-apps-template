import {ClassicElement, HTMLAttributes} from 'react';
import {SuspendableComponentProps} from '../Suspend';
import {PanelProps} from '../Panel';

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
