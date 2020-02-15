import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/Root/Root';
import vkConnect from '@vkontakte/vk-connect';

window.onload = () => {
  // Уведомляем нативное приложение о том, что мы загрузились.
  vkConnect.send('VKWebAppInit');

  // Устанавливаем цвет контролов интерфейса темными
  if (vkConnect.supports('VKWebAppSetViewSettings')) {
    vkConnect.send('VKWebAppSetViewSettings', {
      status_bar_style: 'light',
      action_bar_color: '#000',
      navigation_bar_color: '#000',
    });
  }

  ReactDOM.render(<Root/>, document.getElementById('root'));
};
