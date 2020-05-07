import {SuspendableOptionalProps} from '../components/Suspend';
import {ComponentType} from 'react';
import {PanelProps} from '../components/Panel';
import {ViewProps} from '../components/View';

export type IDType = string | number;

type Tree<ID extends IDType, T> = {
  [id in ID]: T;
};

/**
 * Allowed suspendable props to use in trees
 */
type AllowedSuspendableProps = Omit<SuspendableOptionalProps,
  'isSuspended' | 'wasMountedBefore' | 'transitionStatus'>;

/**
 * Panel in a tree
 */
interface TreePanel extends AllowedSuspendableProps {
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

/**
 * View in a tree
 */
export interface TreeView<PanelId extends IDType> extends AllowedSuspendableProps {
  /**
   * Component which will be used instead of default "View"
   */
  as?: ComponentType<ViewProps>;
  /**
   * List of view panels
   */
  panels: Tree<PanelId, TreePanel>;
}

/**
 * Describes views tree
 */
export type ViewsTree<ViewId extends IDType,
  PanelId extends IDType,
  PopupID extends IDType> = Tree<ViewId, TreeView<PanelId>>;

/**
 * Returns available routes depending on passed views tree
 */
export type GetRoutes<T> = T extends ViewsTree<infer ViewId, any, any>
  ? {
    [View in ViewId]: T[View] extends TreeView<infer PanelId>
      ? {
        // Looks like some bug in TypeScript. It sees the type of "panels" prop
        // and can use it correctly while assigning GetRoutes to some type
        // but says "panels" can not be used as index type.
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        [Panel in PanelId]: T[View]['panels'][Panel] extends TreePanel
          ? { view: View; panel: Panel }
          : never
      }[PanelId]
      : never
  }[ViewId]
  : never;

/**
 * Description of URL's query
 */
export type Query = Record<string, string>;

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
