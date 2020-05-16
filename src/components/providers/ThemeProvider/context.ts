import {createContext} from 'react';
import {createUseNullableContext} from '../../../utils';

import {ThemeContext} from './types';

export const themeContext = createContext<ThemeContext | null>(null);
export const useTheme = createUseNullableContext('useTheme', themeContext);

themeContext.displayName = 'ThemeContext';
