import {createContext, useContext} from 'react';

export interface AppRootContext {
  init(): void;
}

export const appRootContext = createContext<AppRootContext>({
  init: () => {
  },
});

appRootContext.displayName = 'AppRootContext';

export const useAppRootContext = () => useContext(appRootContext);
