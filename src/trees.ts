import {PanelsEnum, PopupsEnum, ViewsEnum, ViewsTree} from './types';
import {createSet, ValidateTree} from 'vkma-router';
import {Panel1} from './components/panels/Panel1';
import {Panel2} from './components/panels/Panel2';

/**
 * Application routing tree. Should be an extension of vkma-router's
 * RoutingTree
 * @type {{views: {'[ViewsEnum.Presentation]': {main: any; button: any; select: any; input: any}; '[ViewsEnum.PresentationViewExample]': {main: any; button: any; select: any; input: any}}}}
 */
export const routingTree = {
  views: {
    [ViewsEnum.Hello]: createSet([
      PanelsEnum.World,
      PanelsEnum.Underworld,
    ]),
  },
  popups: createSet(Object.values(PopupsEnum)),
};

/**
 * Application tree type
 */
export type AppTree = ValidateTree<typeof routingTree>;

/**
 * This variable does nothing. The only one purpose we need this variable is to
 * check if tree has valid format. AppTree will have type "never" in case when
 * tree does not extend RoutingTree
 * @type {{popups: any; views: {'[ViewsEnum.Presentation]': {main: any; button: any; select: any; input: any}; '[ViewsEnum.PresentationViewExample]': {main: any; button: any; select: any; input: any}}}}
 * @private
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _: AppTree = routingTree;

/**
 * Represents application views tree
 * @type {{'[ViewsEnum.Presentation]': {panels: {'[PanelsEnum.PresentationInput]': {component: React.NamedExoticComponent<object>; header: boolean; keepMountedAfterSuspend: boolean}; '[PanelsEnum.PresentationSelect]': {component: React.NamedExoticComponent<object>; header: boolean}; '[PanelsEnum.PresentationButton]': {keepMounted: boolean; component: React.NamedExoticComponent<object>; header: boolean}; '[PanelsEnum.PresentationMain]': {component: React.NamedExoticComponent<object>; header: boolean}}}; '[ViewsEnum.PresentationViewExample]': {panels: {'[PanelsEnum.PresentationViewExampleMain]': {component: () => string; header: boolean}}}}}
 */
export const viewsTree: ViewsTree = {
  [ViewsEnum.Hello]: {
    panels: {
      [PanelsEnum.World]: {
        header: true,
        component: Panel1,
      },
      [PanelsEnum.Underworld]: {
        header: true,
        component: Panel2,
      },
    },
  },
};
