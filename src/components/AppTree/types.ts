import {ComponentType} from 'react';
import {ViewProps} from '../View';
import {PanelProps} from '../Panel';
import {SuspendableOptionalProps} from '../Suspend';

export interface Tree<T> {
  [id: string]: T;
}

type AllowedSuspendableProps = Omit<SuspendableOptionalProps,
  'isSuspended' | 'wasMountedBefore' | 'transitionStatus'>;

export interface TreePanel extends AllowedSuspendableProps {
  /**
   * Component which will be used instead of default "Panel"
   */
  as?: ComponentType<PanelProps>;
  /**
   * Does panel contains header
   */
  header?: boolean;
  /**
   * Component which should be rendered inside panel
   */
  component: ComponentType<SuspendableOptionalProps>;
}

export interface TreeView extends AllowedSuspendableProps {
  /**
   * Component which will be used instead of default "View"
   */
  as?: ComponentType<ViewProps>;
  /**
   * List of view panels
   */
  panels: Tree<TreePanel>;
}

export interface ViewTree extends Tree<TreeView> {
}

export interface AppTreeProps {
  tree: ViewTree;
  activeView: string;
  activePanel: string;
}
