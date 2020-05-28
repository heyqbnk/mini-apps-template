import {Theme} from '../types';
import {themeDefaults} from './themeDefaults';

import {
  buttonBrightLightTheme,
  formControlBrightLightTheme,
  inputBrightLightTheme,
  linkBrightLightTheme, panelBrightLightTheme, panelHeaderBrightLightTheme,
  selectBrightLightTheme,
  separatorBrightLightTheme, viewBrightLightTheme,
} from '../component-themes';

export const brightLightTheme: Theme = {
  ...themeDefaults,
  components: {
    Button: buttonBrightLightTheme,
    FormControl: formControlBrightLightTheme,
    Input: inputBrightLightTheme,
    Link: linkBrightLightTheme,
    Panel: panelBrightLightTheme,
    PanelHeader: panelHeaderBrightLightTheme,
    Select: selectBrightLightTheme,
    Separator: separatorBrightLightTheme,
    View: viewBrightLightTheme,
  },
  palette: {
    text: {
      primary: 'black',
      secondary: '#818c99',
    },
  },
};
