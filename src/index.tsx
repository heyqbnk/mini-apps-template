import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/Root/Root';
import vkConnect from '@vkontakte/vk-connect';

// TODO: Preload assets

// We are waiting for all assets to be loaded to make sure, we have all of
// css and fonts loaded. You can remove this logic if needed.
window.onload = () => {
  // Notify native application, initialization is completed. It will make
  // native application loader disappear and show our application.
  vkConnect.send('VKWebAppInit');

  // Render root component.
  ReactDOM.render(<Root/>, document.getElementById('root'));
};
