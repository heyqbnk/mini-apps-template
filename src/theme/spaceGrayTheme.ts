import {Theme} from './types';
import {themeDefaults} from './themeDefaults';

import {buttonSpaceGrayTheme} from '../components/Button';
import {formControlSpaceGrayTheme} from '../components/FormControl';
import {inputSpaceGrayTheme} from '../components/Input';
import {linkSpaceGrayTheme} from '../components/Link';
import {selectSpaceGrayTheme} from '../components/Select';
import {separatorSpaceGrayTheme} from '../components/Separator';

export const spaceGrayTheme: Theme = {
  ...themeDefaults,
  components: {
    Button: buttonSpaceGrayTheme,
    FormControl: formControlSpaceGrayTheme,
    Input: inputSpaceGrayTheme,
    Link: linkSpaceGrayTheme,
    Select: selectSpaceGrayTheme,
    Separator: separatorSpaceGrayTheme,
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
