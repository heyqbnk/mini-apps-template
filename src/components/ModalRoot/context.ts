import {createContext} from 'react';
import {createUseNullableContext} from '../../utils';

import {ModalRootContext} from './types';

export const modalRootContext = createContext<ModalRootContext | null>(null);
export const useModalRootContext = createUseNullableContext('useModalRootContext', modalRootContext);

modalRootContext.displayName = 'ModalRootContext';
