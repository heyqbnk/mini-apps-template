import {Theme} from '../types';
import {themeDefaults} from './themeDefaults';

import {
  buttonSpaceGrayTheme,
  formControlSpaceGrayTheme,
  globalStyleSheetSpaceGrayTheme,
  inputSpaceGrayTheme,
  linkSpaceGrayTheme,
  selectSpaceGrayTheme,
  separatorSpaceGrayTheme,
} from '../component-themes';
import {panelSpaceGrayTheme} from '../../components/Panel';

export const spaceGrayTheme: Theme = {
  ...themeDefaults,
  components: {
    Button: buttonSpaceGrayTheme,
    FormControl: formControlSpaceGrayTheme,
    GlobalStyleSheet: globalStyleSheetSpaceGrayTheme,
    Input: inputSpaceGrayTheme,
    Link: linkSpaceGrayTheme,
    Panel: panelSpaceGrayTheme,
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
