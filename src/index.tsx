import React from 'react';
import ReactDOM from 'react-dom';

import {AppRoot} from './components/app/AppRoot';

import {getAppInitials} from './utils';

import '@vkontakte/vkui/dist/vkui.css';

ReactDOM.render(
  <AppRoot {...getAppInitials()}/>,
  document.getElementById('root'),
);
