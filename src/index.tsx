import React from 'react';
import ReactDOM from 'react-dom';
import vkBridge from '@vkontakte/vk-bridge';

import {AppRoot} from './components/AppRoot';

// Notify native application, initialization done. It will make native
// application hide loader and display this application.
vkBridge.send('VKWebAppInit');

// We are making some timeout due to we are unable to get device insets
// correctly. There is a little timeout after VKWebAppInit is called when
// we cannot get truthy insets
setTimeout(() => {
  ReactDOM.render(<AppRoot/>, document.getElementById('root'));
}, 10);
