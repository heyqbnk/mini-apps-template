import {Theme} from './types';
import {buttonSpaceGrayTheme} from './components/Button';
import {themeDefaults} from './themeDefaults';

export const spaceGrayTheme: Theme = {
  ...themeDefaults,
  components: {
    Button: buttonSpaceGrayTheme,
  },
  palette: {
    bodyBackground: '#19191a',
    bodyText: '#e1e3e6',
    text: {
      primary: '#e1e3e6',
      secondary: '#76787a',
    },
  },
};
