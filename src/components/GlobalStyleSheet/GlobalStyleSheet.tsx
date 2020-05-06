import {memo} from 'react';

import {makeStyles} from '@material-ui/styles';
import {Theme} from '../../theme';

import {ttCommonsDemiBold, ttCommonsMedium, ttCommonsRegular} from './fonts';
import {useOS} from '../../hooks';

import {OS} from '../../types';

interface UseStylesProps {
  os: OS;
}

const useStyles = makeStyles<Theme, UseStylesProps>((theme: Theme) => {
  const {
    textColor, getFontFamily, fontSize,
  } = theme.components.GlobalStyleSheet;

  return {
    '@global': {
      // Add TT Commons font family
      '@font-face': [{
        fontFamily: 'TT Commons',
        fontStyle: 'normal',
        fontWeight: 400,
        src: `url("${ttCommonsRegular}") format("woff")`,
      }, {
        fontFamily: 'TT Commons',
        fontStyle: 'normal',
        fontWeight: 500,
        src: `url("${ttCommonsMedium}") format("woff")`,
      }, {
        fontFamily: 'TT Commons',
        fontStyle: 'normal',
        fontWeight: 600,
        src: `url("${ttCommonsDemiBold}") format("truetype")`,
      }],
      // Set body and #root defaults
      body: {
        overflowX: 'hidden',
        color: textColor,
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
        color: textColor,
      },
    },
  };
}, {name: 'GlobalStyleSheet'});

/**
 * Component which controls global styles
 * @type {React.NamedExoticComponent<object>}
 */
export const GlobalStyleSheet = memo(() => {
  useStyles({os: useOS()});
  return null;
});
