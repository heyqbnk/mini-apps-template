import {ComponentType} from 'react';
import {SuspendablePublicProps} from '../components/suspend/Suspend';
import {PanelProps} from '../components/ui/Panel';
import {ViewProps} from '../components/ui/View';
import {IdType} from 'vkma-router';

/**
 * Map where key has id type and value is passed type
 */
type Tree<T> = {
  [Id in IdType]: T;
};

/**
 * Panel in a tree
 */
interface TreePanel extends SuspendablePublicProps {
  /**
   * Component which will be used instead of default "Panel"
   */
  as?: ComponentType<PanelProps>;
  /**
   * Does panel contains header
   */
  header?: PanelProps['header'];
  /**
   * Component which should be rendered inside panel
   */
  component: PanelProps['component'];
}

/**
 * View in a tree
 */
export interface TreeView extends SuspendablePublicProps {
  /**
   * Component which will be used instead of default "View"
   */
  as?: ComponentType<ViewProps>;
  /**
   * List of view panels
   */
  panels: Tree<TreePanel>;
}

/**
 * Describes views tree
 */
export type ViewsTree = Tree<TreeView>;

/**
 * List of available views in project. Required to avoid routing to
 * non-existing views
 */
export enum ViewsEnum {
  Presentation = 'presentation',
  PresentationViewExample = 'presentation-view-example',
}

/**
 * List of available panels in project. Required to avoid routing to
 * non-existing panel
 */
export enum PanelsEnum {
  Main = 'main',
  Button = 'button',
  Select = 'select',
  Input = 'input',
}

/**
 * List of available popups in project. Required to avoid routing to
 * non-existing popup
 */
export enum PopupsEnum {
}
