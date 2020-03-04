import {Palette} from './palette';
import {Typography} from './typography';

/**
 * Описание темы
 */
export interface Theme {
  palette: Palette;
  typography: Typography;
}
