import {ClassicElement, HTMLAttributes} from 'react';
import {SuspendableComponentProps} from '../../suspend/Suspend';

export interface ViewProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'id' | 'children'>,
    SuspendableComponentProps {
  /**
   * Currently active panel
   */
  activePanel: string;
  /**
   * List of panels
   */
  children: ClassicElement<any> | ClassicElement<any>[];
}
