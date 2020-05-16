import {getOS} from './device';
import {getLaunchParams} from './launch-params';
import {getInsets} from './dom';
import {historyStateFromURL, isStateInTree, HistoryState} from 'vkma-router';
import config from '../config';

import {AppTree, routingTree} from '../trees';
import {PanelsEnum, ViewsEnum} from '../types';
import {AppRootProps} from '../components/app/AppRoot';

/**
 * Returns application initials
 * @returns {AppRootProps}
 */
export function getAppInitials(): AppRootProps {
  // Getting current operating system
  const os = getOS(navigator.userAgent);

  // Getting launch parameters
  const launchParams = getLaunchParams(window.location.search.slice(1));

  // According to that we know, there are CSS-variables defined in index.html
  // we are getting insets from them
  const insets = getInsets();

  // Prepare initial routing state
  const historyState = historyStateFromURL(window.location.hash);

  // NOTE: Not sure this is the correct way of defining initial history.
  //  In enterprise application, it is required to define initial history
  //  depending on state from URL or other logic, not this simple one
  const history: HistoryState<AppTree>[] = [{
    view: ViewsEnum.Presentation,
    panel: PanelsEnum.Main,
    popup: null,
    query: {},
  }];

  if (historyState && isStateInTree(historyState, routingTree)) {
    history.push(historyState);
  }

  return {
    envConfig: config,
    os,
    launchParams,
    insets,
    history,
  };
}
