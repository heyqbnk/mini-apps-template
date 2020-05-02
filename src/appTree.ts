import {ViewTree} from './components/AppTree';
import {MainPanel} from './components/_presentation/MainPanel';
import {ButtonPanel} from './components/_presentation/ButtonPanel';
import {SelectPanel} from './components/_presentation/SelectPanel';
import {InputPanel} from './components/_presentation/InputPanel';

/**
 * Represents application views tree
 * @type {{presentation: {panels: {button: {component: React.NamedExoticComponent<object>; header: boolean}; input: {component: React.NamedExoticComponent<object>; header: boolean}; select: {component: React.NamedExoticComponent<object>; header: boolean}; main: {component: React.NamedExoticComponent<object>; header: boolean}}}}}
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
      },
      select: {
        header: true,
        component: SelectPanel,
      },
      input: {
        header: true,
        component: InputPanel,
      },
    }
  }
};
