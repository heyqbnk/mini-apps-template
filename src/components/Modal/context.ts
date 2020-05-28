import {createContext} from 'react';
import {createUseNullableContext} from '../../utils';

import {ModalContext} from './types';

export const modalContext = createContext<ModalContext | null>(null);
export const useModalContext = createUseNullableContext('useModalContext', modalContext);

modalContext.displayName = 'ModalContext';
