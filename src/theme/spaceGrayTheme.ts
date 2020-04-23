import {Theme} from './types';
import {themeDefaults} from './themeDefaults';
import {buttonSpaceGrayTheme, selectSpaceGrayTheme} from './components';

export const spaceGrayTheme: Theme = {
  ...themeDefaults,
  components: {
    Button: buttonSpaceGrayTheme,
    Select: selectSpaceGrayTheme,
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
