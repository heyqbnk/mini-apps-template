import React from 'react';
import ReactDOM from 'react-dom';

import {AppRoot} from './components/AppRoot';

import '@vkontakte/vkui/dist/vkui.css';

import {getOS, getLaunchParams, getInsets} from './utils';
import {historyStateFromURL, HistoryType} from './components/Router';
import config from './config';

// Waiting for assets to be loaded to make sure, all css and js files are
// loaded
window.onload = () => {
  // Getting current operating system
  const os = getOS(navigator.userAgent);

  // Getting launch parameters
  const launchParams = getLaunchParams(window.location.search.slice(1));

  // According to that we know, there are CSS-variables defined in index.html
  // we are getting insets from them
  const insets = getInsets();

  // Prepare initial routing state. In case, when routing state cannot be
  // prepared, return default state
  const state = historyStateFromURL(window.location.hash);

  const history: HistoryType = [{
    view: 'presentation', panel: 'main', popup: null, query: {},
  }];

  // TODO: Refactor + Routing tree
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
};
