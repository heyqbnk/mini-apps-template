import {Theme} from '../types';
import {themeDefaults} from '../themeDefaults';

import {buttonBrightLightTheme} from '../component-themes';
import {formControlBrightLightTheme} from '../../components/FormControl';
import {inputBrightLightTheme} from '../../components/Input';
import {linkBrightLightTheme} from '../../components/Link';
import {selectBrightLightTheme} from '../../components/Select';
import {separatorBrightLightTheme} from '../../components/Separator';
import {panelBrightLightTheme} from '../../components/Panel';

export const brightLightTheme: Theme = {
  ...themeDefaults,
  components: {
    Button: buttonBrightLightTheme,
    FormControl: formControlBrightLightTheme,
    Input: inputBrightLightTheme,
    Link: linkBrightLightTheme,
    Panel: panelBrightLightTheme,
    Select: selectBrightLightTheme,
    Separator: separatorBrightLightTheme,
  },
  palette: {
    bodyText: 'black',
    text: {
      primary: 'black',
      secondary: '#818c99',
    },
  },
};
