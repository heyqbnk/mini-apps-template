import {ComponentType} from 'react';
import {ViewProps} from '../View';
import {PanelProps} from '../Panel';
import {Suspendable, SuspendableComponent} from '../Suspend';

interface TreeElementProps extends Pick<SuspendableComponent,
  'isAlwaysMounted' | 'keepMountedAfterSuspend'> {
}

export interface Tree<T> {
  [id: string]: T;
}

export interface TreePanel extends TreeElementProps {
  /**
   * Component which will be used instead of default "Panel"
   */
  as?: ComponentType<PanelProps>;
  /**
   * Does panel contains header
   */
  header?: boolean;
  /**
   * Component which should be rendered
   */
  component: ComponentType<Suspendable>;
}

export interface TreeView extends TreeElementProps {
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
