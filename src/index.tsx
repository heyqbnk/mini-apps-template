import React from 'react';
import ReactDOM from 'react-dom';

import {AppRoot} from './components/AppRoot';

import '@vkontakte/vkui/dist/vkui.css';

import {getOS, getLaunchParams, getInsets} from './utils';
import {historyStateFromURL, HistoryType} from './components/Router';
import config from './config';
import {viewsTree, AppViewsTree} from './viewsTree';

import {PanelsEnum, ViewsEnum} from './types';

// Getting current operating system
const os = getOS(navigator.userAgent);

// Getting launch parameters
const launchParams = getLaunchParams(window.location.search.slice(1));

// According to that we know, there are CSS-variables defined in index.html
// we are getting insets from them
const insets = getInsets();

// Prepare initial routing state
const state = historyStateFromURL(window.location.hash, viewsTree);

// NOTE: Not sure this is the correct way of defining initial history.
// In production, it is required to define initial history depending on
// state from URL
const history: HistoryType<AppViewsTree> = [{
  view: ViewsEnum.Presentation,
  panel: PanelsEnum.Main,
  popup: null,
  query: {},
}];

if (
  state
  && state.view !== history[0].view
  && state.panel !== history[0].panel
) {
  history.push(state);
}

// Display application
ReactDOM.render(
  <AppRoot
    config={config}
    os={os}
    launchParams={launchParams}
    insets={insets}
    initialHistory={history}
  />,
  document.getElementById('root'),
);
