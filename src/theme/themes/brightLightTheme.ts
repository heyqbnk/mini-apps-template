import {Theme} from '../types';
import {themeDefaults} from './themeDefaults';

import {
  buttonBrightLightTheme,
  formControlBrightLightTheme,
  globalStyleSheetBrightLightTheme,
  inputBrightLightTheme,
  linkBrightLightTheme,
  selectBrightLightTheme,
  separatorBrightLightTheme,
} from '../component-themes';
import {panelBrightLightTheme} from '../../components/Panel';

export const brightLightTheme: Theme = {
  ...themeDefaults,
  components: {
    Button: buttonBrightLightTheme,
    FormControl: formControlBrightLightTheme,
    GlobalStyleSheet: globalStyleSheetBrightLightTheme,
    Input: inputBrightLightTheme,
    Link: linkBrightLightTheme,
    Panel: panelBrightLightTheme,
    Select: selectBrightLightTheme,
    Separator: separatorBrightLightTheme,
  },
  palette: {
    text: {
      primary: 'black',
      secondary: '#818c99',
    },
  },
};
