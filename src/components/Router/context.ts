import {createContext, useContext} from 'react';
import {RouterContext} from './types';
import {createBrowserHistory} from 'history';

const noop = () => {
};

export const routerContext = createContext<RouterContext>({
  history: createBrowserHistory(),
  prevState: null,
  currentState: {view: '', panel: '', popup: null, query: {}},
  pushState: noop,
  createHref: () => '',
});

export const useRouter = () => useContext(routerContext);
