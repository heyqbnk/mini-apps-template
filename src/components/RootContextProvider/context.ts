import {createContext} from 'react';

export interface RootContext {
  init(): void;
}

const context = createContext<RootContext>({
  init: () => {
  },
});

export default context;
