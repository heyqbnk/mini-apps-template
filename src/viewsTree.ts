import {MainPanel} from './components/_presentation/MainPanel';
import {ButtonPanel} from './components/_presentation/ButtonPanel';
import {SelectPanel} from './components/_presentation/SelectPanel';
import {InputPanel} from './components/_presentation/InputPanel';
import {ViewExamplePanel} from './components/_presentation/ViewExamplePanel';

import {ViewsEnum, PanelsEnum, GetRoutes} from './types';
import {HistoryStateType} from './components/Router';

/**
 * Represents application views tree
 * @type {{'[ViewsEnum.Presentation]': {panels: {'[PanelsEnum.PresentationInput]': {component: React.NamedExoticComponent<object>; header: boolean; keepMountedAfterSuspend: boolean}; '[PanelsEnum.PresentationSelect]': {component: React.NamedExoticComponent<object>; header: boolean}; '[PanelsEnum.PresentationButton]': {keepMounted: boolean; component: React.NamedExoticComponent<object>; header: boolean}; '[PanelsEnum.PresentationMain]': {component: React.NamedExoticComponent<object>; header: boolean}}}; '[ViewsEnum.PresentationViewExample]': {panels: {'[PanelsEnum.PresentationViewExampleMain]': {component: () => string; header: boolean}}}}}
 */
export const viewsTree = {
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

/**
 * Current application views tree
 */
export type AppViewsTree = typeof viewsTree;

/**
 * Current application history state type
 */
export type AppHistoryStateType = HistoryStateType<AppViewsTree>;

/**
 * Type which states that tree is valid
 */
type RoutesAreValid = GetRoutes<AppViewsTree> extends never
  ? false
  : true;

// This variable does nothing. The only thing we need this variable is to check
// if app tree has valid format. RoutesAreValid will have type "false" in case
// if tree is invalid
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _: RoutesAreValid = true;
