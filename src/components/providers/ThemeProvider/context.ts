import {createContext, useContext} from 'react';
import {ThemeContext} from './types';
import {brightLightTheme} from '../../../theme';

const noop = () => {
};

export const themeContext = createContext<ThemeContext>({
  theme: brightLightTheme,
  appearance: 'light',
  scheme: 'bright_light',
  setScheme: noop,
  setAppearance: noop,
});

export const useTheme = () => useContext(themeContext);
