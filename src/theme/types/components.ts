import {
  ButtonTheme,
  FormControlTheme,
  GlobalStyleSheetTheme,
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
  GlobalStyleSheet: GlobalStyleSheetTheme;
  Input: InputTheme;
  Link: LinkTheme;
  Panel: PanelTheme;
  PanelHeader: PanelHeaderTheme;
  Select: SelectTheme;
  Separator: SeparatorTheme;
  View: ViewTheme;
}
