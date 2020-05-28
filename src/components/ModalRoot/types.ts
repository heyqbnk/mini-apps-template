import {ReactNode, ReactNodeArray} from 'react';

export interface ModalRootContext {
  activeModal: symbol | null;
  mountModal(modalId: symbol): void;
  unmountModal(modalId: symbol): void;
  rootNode: Element;
}

export interface ModalRootProps {
  children?: ReactNode | ReactNodeArray;
}
