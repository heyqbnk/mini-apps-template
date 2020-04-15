import React from 'react';
import ReactDOM from 'react-dom';

import {Root} from './components/Root';

import '@vkontakte/vkui/dist/vkui.css';

// Ожидаем загрузки всех ассетов чтобы убедиться, что все шрифты, css и js
// загружены.
window.onload = () => {
  // Отображаем приложение.
  ReactDOM.render(<Root/>, document.getElementById('root'));
};
