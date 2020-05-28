import {Theme} from '../types';
import {themeDefaults} from './themeDefaults';

import {
  buttonSpaceGrayTheme,
  formControlSpaceGrayTheme,
  inputSpaceGrayTheme,
  linkSpaceGrayTheme, panelHeaderSpaceGrayTheme, panelSpaceGrayTheme,
  selectSpaceGrayTheme,
  separatorSpaceGrayTheme, viewSpaceGrayTheme,
} from '../component-themes';

export const spaceGrayTheme: Theme = {
  ...themeDefaults,
  components: {
    Button: buttonSpaceGrayTheme,
    FormControl: formControlSpaceGrayTheme,
    Input: inputSpaceGrayTheme,
    Link: linkSpaceGrayTheme,
    Panel: panelSpaceGrayTheme,
    PanelHeader: panelHeaderSpaceGrayTheme,
    Select: selectSpaceGrayTheme,
    Separator: separatorSpaceGrayTheme,
    View: viewSpaceGrayTheme,
  },
  palette: {
    text: {
      primary: '#e1e3e6',
      secondary: '#76787a',
    },
  },
};
