import React from 'react';
import ReactDOM from 'react-dom';

import {AppRoot} from './components/app/AppRoot';

import {getOS, getLaunchParams, getInsets} from './utils';
import {historyStateFromURL, HistoryType} from './components/routing/Router';
import config from './config';
import {viewsTree, AppViewsTree} from './viewsTree';

import {PanelsEnum, ViewsEnum} from './types';

import '@vkontakte/vkui/dist/vkui.css';

// Getting current operating system
const os = getOS(navigator.userAgent);

// Getting launch parameters
const launchParams = getLaunchParams(window.location.search.slice(1));

// According to that we know, there are CSS-variables defined in index.html
// we are getting insets from them
const insets = getInsets();

// Prepare initial routing state
const historyState = historyStateFromURL(window.location.hash, viewsTree);

// NOTE: Not sure this is the correct way of defining initial history.
//  In enterprise application, it is required to define initial history
//  depending on state from URL or other logic, not this simple one
const history: HistoryType<AppViewsTree> = [{
  view: ViewsEnum.Presentation,
  panel: PanelsEnum.Main,
  popup: null,
  query: {},
}];

if (
  historyState
  && historyState.view !== history[0].view
  && historyState.panel !== history[0].panel
) {
  history.push(historyState);
}

// Display application
ReactDOM.render(
  <AppRoot
    envConfig={config}
    os={os}
    launchParams={launchParams}
    insets={insets}
    history={history}
  />,
  document.getElementById('root'),
);
