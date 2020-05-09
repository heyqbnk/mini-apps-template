import {memo} from 'react';

import {makeStyles} from '@material-ui/styles';
import {Theme} from '../../../theme';

import {useDevice} from '../../providers/DeviceProvider';

import {OS} from '../../../types';

interface UseStylesProps {
  os: OS;
}

const useStyles = makeStyles<Theme, UseStylesProps>((theme: Theme) => {
  const {
    foregroundColor, getFontFamily, fontSize, backgroundColor,
  } = theme.components.GlobalStyleSheet;

  return {
    '@global': {
      html: {
        height: '100%',
      },
      body: {
        height: '100%',
        overflowX: 'hidden',
        color: foregroundColor,
        backgroundColor,
        fontFamily: ({os}) => getFontFamily(os),
        fontSize,
        userSelect: 'none',
        '-webkit-font-smoothing': 'antialiased',
        '-webkit-tap-highlight-color': 'transparent',
        '-webkit-text-size-adjust': '100%',
      },
      '#root': {
        height: '100%',
      },
      'body, #root': {
        margin: 0,
        padding: 0,
      },
      // TODO: Remove this style when VKUI is removed from template
      'div#root': {
        color: foregroundColor,
      },
    },
  };
}, {name: 'GlobalStyleSheet'});

/**
 * Component which controls global styles
 * @type {React.NamedExoticComponent<object>}
 */
export const GlobalStyleSheet = memo(function GlobalStyleSheet() {
  useStyles({os: useDevice().os});
  return null;
});

