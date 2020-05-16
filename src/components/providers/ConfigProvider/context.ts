import {createContext} from 'react';
import {createUseNullableContext} from '../../../utils';

import {ConfigContext} from './types';

export const configContext = createContext<ConfigContext | null>(null);
export const useConfig = createUseNullableContext('useConfig', configContext);

configContext.displayName = 'ConfigContext';
