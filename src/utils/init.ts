import {
  historyStateFromURL,
  isStateInTree,
  NonIndexedHistory,
} from 'vkma-router';

import {AppTree, routingTree} from '../trees';
import {PanelsEnum, ViewsEnum} from '../types';

/**
 * Returns initial history
 * @returns {HistoryState<AppTree>[]}
 */
export function getInitialHistory(): NonIndexedHistory<AppTree> {
  // Prepare initial routing state
  const historyState = historyStateFromURL(window.location.hash);

  // NOTE: Not sure this is the correct way of defining initial history.
  //  In enterprise application, it is required to define initial history
  //  depending on state from URL or other logic, not this simple one
  const history: NonIndexedHistory<AppTree> = [{
    view: ViewsEnum.Hello,
    panel: PanelsEnum.World,
    popup: null,
    query: {},
  }];

  if (historyState && isStateInTree(historyState, routingTree)) {
    history.push(historyState as any);
  }

  return history;
}
