import {ViewsTree} from '../../../types';

export interface AppTreeProps {
  tree: ViewsTree<any, any, any>;
  activeView: string;
  activePanel: string;
}
