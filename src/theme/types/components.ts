import {
  ButtonTheme,
  FormControlTheme,
  GlobalStyleSheetTheme,
  InputTheme, LinkTheme, SelectTheme, SeparatorTheme,
} from '../component-themes';
import {PanelTheme} from '../../components/Panel';

/**
 * Description of themes directly connected with project components
 */
export interface Components {
  Button: ButtonTheme;
  FormControl: FormControlTheme;
  GlobalStyleSheet: GlobalStyleSheetTheme;
  Input: InputTheme;
  Link: LinkTheme;
  Panel: PanelTheme;
  Select: SelectTheme;
  Separator: SeparatorTheme;
}
