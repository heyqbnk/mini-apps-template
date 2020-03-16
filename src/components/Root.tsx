import React, {PureComponent} from 'react';

import AppLoadingView from './views/AppLoadingView';
import App from './App';
import {Provider as StoreProvider} from 'react-redux';
import ThemeProvider from './ThemeProvider';
import AppCrashView from './views/AppCrashView';
import RootContextProvider, {RootContext} from './RootContextProvider';
import ServicePanel from './ServicePanel';

import createReduxStore from '../redux';
import vkBridge, {
  Insets,
  UpdateConfigData,
  VKBridgeSubscribeHandler,
} from '@vkontakte/vk-bridge';
import {configActions, ConfigReducerState} from '../redux/reducers/config';
import {getStorageValues} from '../utils/storage';
import config from '../config';

import {Store} from 'redux';
import {ReduxState} from '../redux/types';
import {StorageField} from '../types/bridge';

interface IState {
  loading: boolean;
  error: string | null;
  store: Store<ReduxState> | null;
}

/**
 * Является "мозгом" приложение. Если быть более конкретным - его
 * корнем. Здесь подгружаются все необходимые для работы приложения данные,
 * а также создаются основные контексты.
 */
class Root extends PureComponent<{}, IState> {
  public state: Readonly<IState> = {
    loading: true,
    error: null,
    store: null,
  };

  /**
   * Переменная которая отвечает за то, что было ли отправлено событие
   * обновления конфига приложения. Необходимо в случае, когда это событие
   * успели отловить но в тот момент Redux-хранилища еще не существовало.
   * @type {null}
   */
  private initialAppConfig: UpdateConfigData | null = null;

  /**
   * Аналогично initialAppConfigSent.
   * @type {null}
   */
  private initialAppInsets: Insets | null = null;

  /**
   * Значение для контекста рута
   * @type {{init: () => Promise<void>}}
   */
  private rootContextValue: RootContext = {init: this.init.bind(this)};

  /**
   * Иницилизирует приложение.
   */
  private async init() {
    this.setState({loading: true, error: null});

    let error: string | null = null;
    let store: Store<ReduxState> | null = null;

    try {
      // Здесь необходимо выполнить все асинхронные операции и получить
      // данные для запуска приложения, после чего создать хранилище Redux.
      const [storage] = await Promise.all([
        getStorageValues(...Object.values(StorageField)),
      ]);
      let appConfig: ConfigReducerState = {
        app: 'vkclient',
        appConfig: config,
        appId: '',
        appearance: 'light',
        scheme: 'client_light',
        insets: {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        },
        startTime: 0,
        viewportHeight: 0,
        viewportWidth: 0,
      };

      if (this.initialAppConfig) {
        appConfig = {...appConfig, ...this.initialAppConfig};
      }
      if (this.initialAppInsets) {
        appConfig = {...appConfig, insets: this.initialAppInsets};
      }

      store = createReduxStore({storage, config: appConfig});
    } catch (e) {
      // В случае ошибки, мы её отловим и покажем экран с ошибкой.
      const err = e as Error;
      error = err.message;
    }

    this.setState({store, error, loading: false});
  }

  /**
   * Проверяет, является событие VKWebAppUpdateConfig или VKWebAppUpdateInsets
   * чтобы узнать каков конфиг приложения в данный момент, а также - какие
   * внутренние рамки экрана существуют.
   * @param {VKBridgeEvent<ReceiveMethodName>} event
   */
  private onVKBridgeEvent: VKBridgeSubscribeHandler = event => {
    const {store} = this.state;

    if (event.detail) {
      if (event.detail.type === 'VKWebAppUpdateConfig') {
        if (store) {
          store.dispatch(configActions.updateConfig(event.detail.data));
        } else {
          this.initialAppConfig = event.detail.data;
        }
      } else if (event.detail.type === 'VKWebAppUpdateInsets') {
        if (store) {
          store.dispatch(
            configActions.updateInsets(event.detail.data.insets),
          );
        } else {
          this.initialAppInsets = event.detail.data.insets;
        }
      }
    }
  };

  public componentDidMount() {
    // Когда компонент загрузился, мы ожидаем обновления внутренних рамок
    // и конфига приложения.
    vkBridge.subscribe(this.onVKBridgeEvent);

    // Уведомляем нативное приложение о том, что инициализация окончена.
    // Это заставит нативное приложение спрятать лоадер и показать наше
    // приложение.
    // Причина по которой мы проводим инициализацию здесь - нативное приложение
    // автоматически отправлять информацию о конфиге и внутренних рамках,
    // которая нам нужна.
    vkBridge.send('VKWebAppInit');

    // Инициализируем приложение.
    this.init();
  }

  public componentDidCatch(error: Error) {
    // Отлавливаем ошибку, если выше этого не произошло.
    this.setState({error: error.message});
  }

  public componentWillUnmount() {
    // При разгрузке удаляем слушателя событий.
    vkBridge.unsubscribe(this.onVKBridgeEvent);
  }

  public render() {
    const {loading, error, store} = this.state;

    // Отображаем лоадер если приложение еще загружается.
    if (loading) {
      return <AppLoadingView/>;
    }

    // Отображаем ошибку если она была.
    if (error) {
      return (
        <ThemeProvider>
          <AppCrashView onRestartClick={this.init.bind(this)} error={error}/>
        </ThemeProvider>
      );
    }

    // Исключительные случай, который невозможен
    if (!store) {
      return null;
    }

    // Отображаем приложение если у нас есть всё, что необходимо.
    return (
      <StoreProvider store={store}>
        <RootContextProvider value={this.rootContextValue}>
          <ThemeProvider>
            <ServicePanel/>
            <App/>
          </ThemeProvider>
        </RootContextProvider>
      </StoreProvider>
    );
  }
}

export default Root;
