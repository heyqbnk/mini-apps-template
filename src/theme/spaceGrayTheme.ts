import {Theme} from './types';
import {themeDefaults} from './themeDefaults';
import {
  buttonSpaceGrayTheme,
  formControlSpaceGrayTheme,
  inputSpaceGrayTheme, linkSpaceGrayTheme,
  selectSpaceGrayTheme,
} from './components';

export const spaceGrayTheme: Theme = {
  ...themeDefaults,
  components: {
    Button: buttonSpaceGrayTheme,
    FormControl: formControlSpaceGrayTheme,
    Input: inputSpaceGrayTheme,
    Link: linkSpaceGrayTheme,
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
