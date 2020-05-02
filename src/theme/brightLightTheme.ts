import {Theme} from './types';
import {themeDefaults} from './themeDefaults';

import {buttonBrightLightTheme} from '../components/Button';
import {formControlBrightLightTheme} from '../components/FormControl';
import {inputBrightLightTheme} from '../components/Input';
import {linkBrightLightTheme} from '../components/Link';
import {selectBrightLightTheme} from '../components/Select';
import {separatorBrightLightTheme} from '../components/Separator';

export const brightLightTheme: Theme = {
  ...themeDefaults,
  components: {
    Button: buttonBrightLightTheme,
    FormControl: formControlBrightLightTheme,
    Input: inputBrightLightTheme,
    Link: linkBrightLightTheme,
    Select: selectBrightLightTheme,
    Separator: separatorBrightLightTheme,
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
