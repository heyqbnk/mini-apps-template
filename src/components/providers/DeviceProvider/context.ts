import {createContext} from 'react';
import {createUseNullableContext} from '../../../utils';

import {DeviceContext} from './types';

export const deviceContext = createContext<DeviceContext | null>(null);
export const useDevice = createUseNullableContext('useDevice', deviceContext);

deviceContext.displayName = 'DeviceContext';
