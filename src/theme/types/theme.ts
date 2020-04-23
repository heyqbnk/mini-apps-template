import {Palette} from './palette';
import {Typography} from './typography';
import {Components} from './components';

/**
 * Описание темы
 */
export interface Theme {
  palette: Palette;
  typography: Typography;
  components: Components;
}

/**
 * Shared themes options
 */
export interface ThemeDefaults extends Pick<Theme, 'typography'> {
}
