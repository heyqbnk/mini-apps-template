import {ButtonTheme} from '../../components/Button';
import {FormControlTheme} from '../../components/FormControl';
import {InputTheme} from '../../components/Input';
import {LinkTheme} from '../../components/Link';
import {SelectTheme} from '../../components/Select';
import {SeparatorTheme} from '../../components/Separator';

/**
 * Description of themes directly connected with project components
 */
export interface Components {
  Button: ButtonTheme;
  FormControl: FormControlTheme;
  Input: InputTheme;
  Link: LinkTheme;
  Select: SelectTheme;
  Separator: SeparatorTheme;
}
