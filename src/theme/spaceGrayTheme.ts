import {Theme} from './types';
import {buttonBrightLightTheme} from './components/Button';

export const brightLightTheme: Theme = {
  components: {
    Button: buttonBrightLightTheme,
  },
  palette: {
    text: {
      primary: 'black',
    },
  },
  typography: {
    fontFamily: '-apple-system, Roboto, Helvetica Neue, Arial',
    fontFamilyTT: '"TT Commons", -apple-system, Roboto, Helvetica Neue, Arial',
    fontSize: 16,
  },
};
