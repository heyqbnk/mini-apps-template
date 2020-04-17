import {Theme} from './types';
import {buttonDefaultTheme} from './components/Button';

export const defaultTheme: Theme = {
  components: {
    Button: buttonDefaultTheme,
  },
  palette: {},
  typography: {
    fontFamily: '-apple-system, Roboto, Helvetica Neue, Arial',
    fontFamilyTT: '"TT Commons", -apple-system, Roboto, Helvetica Neue, Arial',
    fontSize: 16,
  },
};
