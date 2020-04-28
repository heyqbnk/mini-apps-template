import {ClassicElement, HTMLAttributes} from 'react';
import {SuspendableComponent} from '../Suspend';
import {PanelProps} from '../Panel';

export interface ViewProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'id'>, SuspendableComponent {
  /**
   * Panels array
   */
  children: ClassicElement<PanelProps> | ClassicElement<PanelProps>[];
}
