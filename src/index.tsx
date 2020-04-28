import React from 'react';
import ReactDOM from 'react-dom';

import {AppRoot} from './components/AppRoot';

import '@vkontakte/vkui/dist/vkui.css';

import {
  getOS,
  getLaunchParams,
  getInsets,
  prepareRoutingState,
  prepareQuery,
} from './utils';
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
  const url = window.location.hash.slice(1);
  const preparedRoutingState = prepareRoutingState(url);
  const routingState = preparedRoutingState || {
    history: [{view: 'presentation', panel: 'main', popup: null}],
    query: url.includes('?')
      ? prepareQuery(url.slice(url.indexOf('?') + 1))
      : {},
  };

  // Display application
  ReactDOM.render(
    <AppRoot
      os={os}
      launchParams={launchParams}
      insets={insets}
      config={config}
      routingState={routingState}
    />,
    document.getElementById('root'),
  );
};
