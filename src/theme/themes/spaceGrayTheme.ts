import {Theme} from '../types';
import {themeDefaults} from './themeDefaults';

import {
  buttonSpaceGrayTheme,
  formControlSpaceGrayTheme,
  globalStyleSheetSpaceGrayTheme,
  inputSpaceGrayTheme,
  linkSpaceGrayTheme, panelHeaderSpaceGrayTheme, panelSpaceGrayTheme,
  selectSpaceGrayTheme,
  separatorSpaceGrayTheme,
} from '../component-themes';

export const spaceGrayTheme: Theme = {
  ...themeDefaults,
  components: {
    Button: buttonSpaceGrayTheme,
    FormControl: formControlSpaceGrayTheme,
    GlobalStyleSheet: globalStyleSheetSpaceGrayTheme,
    Input: inputSpaceGrayTheme,
    Link: linkSpaceGrayTheme,
    Panel: panelSpaceGrayTheme,
    PanelHeader: panelHeaderSpaceGrayTheme,
    Select: selectSpaceGrayTheme,
    Separator: separatorSpaceGrayTheme,
  },
  palette: {
    text: {
      primary: '#e1e3e6',
      secondary: '#76787a',
    },
  },
};
