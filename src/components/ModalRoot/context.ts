import {createContext, useContext} from 'react';
import {ModalRootContext} from './types';

function noop() {
}

const modalRootContext = createContext<ModalRootContext>({
  activeModal: null,
  mountModal: noop,
  unmountModal: noop,
  rootNode: document.body,
});

export const useModalRootContext = () => useContext(modalRootContext);

export default modalRootContext;
