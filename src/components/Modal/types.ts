import {ReactNode, ReactNodeArray} from 'react';
import {EndHandler} from 'react-transition-group/Transition';

export interface ModalContext {
  registerHeader(node: HTMLElement): void;
  registerBody(node: HTMLElement): void;
}

export interface ModalProps {
  children?: ReactNode | ReactNodeArray;
  show: boolean;
  onClose?(): void;
  onClosed?: EndHandler;
  keepMounted?: boolean;
}
