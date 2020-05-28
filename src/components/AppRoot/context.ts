import {createContext} from 'react';
import {createUseNullableContext} from '../../utils';

import {AppRootContext} from './types';

export const appRootContext = createContext<AppRootContext | null>(null);
export const useAppRootContext = createUseNullableContext('useAppRootContext', appRootContext);

appRootContext.displayName = 'AppRootContext';
