import React from 'react';
import ReactDOM from 'react-dom';

import {Root} from './components/Root';

import '@vkontakte/vkui/dist/vkui.css';

// Waiting for assets to be loaded to make sure, all css and js files are
// loaded
// Ожидаем загрузки всех ассетов чтобы убедиться, что все шрифты, css и js
window.onload = () => {
  // Display application
  ReactDOM.render(<Root/>, document.getElementById('root'));
};
