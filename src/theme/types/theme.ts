import {IPalette} from './palette';
import {ITypography} from './typography';

/**
 * Common theme description.
 */
export interface ITheme {
  palette: IPalette;
  typography: ITypography;
}

/**
 * Every theme core.
 */
export interface IThemeCore extends Omit<ITheme, 'palette'>{
}
