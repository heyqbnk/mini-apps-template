import React from 'react';
import ReactDOM from 'react-dom';

import Root from './components/Root';

import {preloadAssets} from './utils/dom';

import '@vkontakte/vkui/dist/vkui.css';

// Предзагружаем ассеты чтобы убедиться, что приложение не будет моргать
// в процессе работы.
preloadAssets();

// Ожидаем загрузки всех ассетов чтобы убедиться, что все шрифты, css и js
// загружены.
window.onload = () => {
  // Отображаем приложение.
  ReactDOM.render(<Root/>, document.getElementById('root'));
};
