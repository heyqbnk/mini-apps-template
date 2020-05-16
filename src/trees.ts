import {MainPanel} from './components/_presentation/MainPanel';
import {ButtonPanel} from './components/_presentation/ButtonPanel';
import {SelectPanel} from './components/_presentation/SelectPanel';
import {InputPanel} from './components/_presentation/InputPanel';
import {ViewExamplePanel} from './components/_presentation/ViewExamplePanel';

import {ViewsEnum, PanelsEnum, ViewsTree, PopupsEnum} from './types';
import {createSet, ValidateTree} from 'vkma-router';

/**
 * Application routing tree. Should be an extenstion of vkma-router's
 * RoutingTree
 * @type {{views: {'[ViewsEnum.Presentation]': {main: any; button: any; select: any; input: any}; '[ViewsEnum.PresentationViewExample]': {main: any; button: any; select: any; input: any}}}}
 */
export const routingTree = {
  views: {
    [ViewsEnum.Presentation]: createSet([
      PanelsEnum.Main, PanelsEnum.Button, PanelsEnum.Select, PanelsEnum.Input,
    ]),
    [ViewsEnum.PresentationViewExample]: createSet([PanelsEnum.Main]),
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
  [ViewsEnum.Presentation]: {
    panels: {
      [PanelsEnum.Main]: {
        header: true,
        component: MainPanel,
      },
      [PanelsEnum.Button]: {
        header: true,
        component: ButtonPanel,
        // ButtonPanel will always be in React tree
        keepMounted: true,
      },
      [PanelsEnum.Select]: {
        header: true,
        component: SelectPanel,
      },
      [PanelsEnum.Input]: {
        header: true,
        component: InputPanel,
        // InputPanel will stay mounted in case if not active, but was active
        // at least once
        keepMountedAfterSuspend: true,
      },
    },
  },
  [ViewsEnum.PresentationViewExample]: {
    panels: {
      [PanelsEnum.Main]: {
        header: true,
        component: ViewExamplePanel,
      },
    },
  },
};
