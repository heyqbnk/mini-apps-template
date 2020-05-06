import {ViewTree} from './components/AppTree';
import {MainPanel} from './components/_presentation/MainPanel';
import {ButtonPanel} from './components/_presentation/ButtonPanel';
import {SelectPanel} from './components/_presentation/SelectPanel';
import {InputPanel} from './components/_presentation/InputPanel';

/**
 * Represents application views tree
 * @type {{presentation: {panels: {button: {keepMounted: boolean; component: React.NamedExoticComponent<object>; header: boolean}; input: {component: React.NamedExoticComponent<object>; header: boolean}; select: {component: React.NamedExoticComponent<object>; header: boolean}; main: {component: React.NamedExoticComponent<object>; header: boolean}}}}}
 */
export const appTree: ViewTree = {
  presentation: {
    panels: {
      main: {
        header: true,
        component: MainPanel,
      },
      button: {
        header: true,
        component: ButtonPanel,
        // ButtonPanel will always be in React tree
        keepMounted: true,
      },
      select: {
        header: true,
        component: SelectPanel,
      },
      input: {
        header: true,
        component: InputPanel,
        // InputPanel will stay mounted in case if not active, but was active
        // at least once
        keepMountedAfterSuspend: true,
      },
    },
  },
};
