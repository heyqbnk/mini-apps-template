import {Theme} from './types';
import {buttonBrightLightTheme} from './components/Button';
import {themeDefaults} from './themeDefaults';

export const brightLightTheme: Theme = {
  ...themeDefaults,
  components: {
    Button: buttonBrightLightTheme,
  },
  palette: {
    bodyBackground: 'white',
    bodyText: 'black',
    text: {
      primary: 'black',
      secondary: '#818c99',
    },
  },
};
