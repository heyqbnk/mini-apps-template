import {Theme} from '../types';
import {themeDefaults} from '../themeDefaults';

import {buttonSpaceGrayTheme} from '../component-themes';
import {formControlSpaceGrayTheme} from '../../components/FormControl';
import {inputSpaceGrayTheme} from '../../components/Input';
import {linkSpaceGrayTheme} from '../../components/Link';
import {selectSpaceGrayTheme} from '../../components/Select';
import {separatorSpaceGrayTheme} from '../../components/Separator';
import {panelSpaceGrayTheme} from '../../components/Panel';

export const spaceGrayTheme: Theme = {
  ...themeDefaults,
  components: {
    Button: buttonSpaceGrayTheme,
    FormControl: formControlSpaceGrayTheme,
    Input: inputSpaceGrayTheme,
    Link: linkSpaceGrayTheme,
    Panel: panelSpaceGrayTheme,
    Select: selectSpaceGrayTheme,
    Separator: separatorSpaceGrayTheme,
  },
  palette: {
    bodyText: '#e1e3e6',
    text: {
      primary: '#e1e3e6',
      secondary: '#76787a',
    },
  },
};
