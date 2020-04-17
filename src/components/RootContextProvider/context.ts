import {createContext, useContext} from 'react';

export interface RootContext {
  init(): void;
}

export const rootContext = createContext<RootContext>({
  init: () => {
  },
});

/**
 * Позволяет использовать контекст, предоставляемый корнем приложения
 * @returns {RootContext}
 */
export const useRootContext = () => useContext(rootContext);
