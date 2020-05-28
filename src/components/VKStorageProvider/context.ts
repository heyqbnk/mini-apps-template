import {createContext} from 'react';
import {createUseNullableContext} from '../../utils';

import {VKStorageContext} from './types';

export const vkStorageContext = createContext<VKStorageContext<any> | null>(null);
export const useVkStorage = createUseNullableContext('useVkStorage', vkStorageContext);

vkStorageContext.displayName = 'VKStorageContext';
