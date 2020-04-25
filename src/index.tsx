import React from 'react';
import ReactDOM from 'react-dom';

import {Root} from './components/Root';

import '@vkontakte/vkui/dist/vkui.css';

import {getOS} from './utils/device';
import {getLaunchParams} from './utils/launch-params';
import {getInsets} from './utils/dom';
import config from './config';

// @ts-ignore
// import * as eruda from 'eruda';
//
// const el = document.createElement('div');
// document.body.appendChild(el);
//
// eruda.init({
//   container: el,
//   tool: ['console', 'elements']
// });

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

  // Display application
  ReactDOM.render(
    <Root os={os} launchParams={launchParams} insets={insets} config={config}/>,
    document.getElementById('root'),
  );
};
