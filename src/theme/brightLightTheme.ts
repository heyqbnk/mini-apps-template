import {Theme} from './types';
import {themeDefaults} from './themeDefaults';
import {
  buttonBrightLightTheme,
  formControlBrightLightTheme,
  inputBrightLightTheme,
  selectBrightLightTheme,
} from './components';

export const brightLightTheme: Theme = {
  ...themeDefaults,
  components: {
    Button: buttonBrightLightTheme,
    FormControl: formControlBrightLightTheme,
    Input: inputBrightLightTheme,
    Select: selectBrightLightTheme,
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
