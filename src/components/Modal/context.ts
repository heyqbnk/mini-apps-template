import {createContext, useContext} from 'react';
import {ModalContext} from './types';

const noop = () => {
};

export const modalContext = createContext<ModalContext>({
  registerBody: noop,
  registerHeader: noop,
});

export const useModalContext = () => useContext(modalContext);
