import {styled} from '@material-ui/styles';
import {Theme} from '../../theme/types';

export const Subtitle = styled('div')<Theme>(({theme}) => ({
  fontSize: 16,
  marginBottom: 12,
  color: theme.palette.text.secondary,
}));

Subtitle.displayName = 'Subtitle';
