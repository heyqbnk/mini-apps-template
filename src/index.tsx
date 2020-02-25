import React from 'react';
import ReactDOM from 'react-dom';

import Root from './components/Root/Root';

import {preloadAssets} from './utils/dom';

import '@vkontakte/vkui/dist/vkui.css';

// Preload assets to make sure, application will not blink during lifetime.
preloadAssets();

// We are waiting for all assets to be loaded to make sure, we have all of
// css and fonts loaded. You can remove this logic if needed.
window.onload = () => {
  // Render root component.
  ReactDOM.render(<Root/>, document.getElementById('root'));
};
