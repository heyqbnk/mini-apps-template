import {
  ButtonTheme,
  FormControlTheme,
  InputTheme,
  LinkTheme,
  PanelTheme,
  PanelHeaderTheme,
  SelectTheme,
  SeparatorTheme, ViewTheme,
} from '../component-themes';

/**
 * Description of themes directly connected with project components
 */
export interface Components {
  Button: ButtonTheme;
  FormControl: FormControlTheme;
  Input: InputTheme;
  Link: LinkTheme;
  Panel: PanelTheme;
  PanelHeader: PanelHeaderTheme;
  Select: SelectTheme;
  Separator: SeparatorTheme;
  View: ViewTheme;
}
