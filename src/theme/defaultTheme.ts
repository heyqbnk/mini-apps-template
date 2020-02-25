import themeCore from './themeCore';
import {ITheme} from './types';

const defaultTheme: ITheme = {
  ...themeCore,
  palette: {},
};

export default defaultTheme;
