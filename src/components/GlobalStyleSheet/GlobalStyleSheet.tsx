import {memo} from 'react';

import {makeStyles} from '@material-ui/styles';
import {Theme} from '../../theme';

import {ttCommonsDemiBold, ttCommonsMedium, ttCommonsRegular} from './fonts';

const useStyles = makeStyles((theme: Theme) => ({
  '@global': {
    // Create CSS variables to ease getting device safe areas
    ':root': {
      '--safe-area-inset-top': 'env(safe-area-inset-top, 0px)',
      '--safe-area-inset-right': 'env(safe-area-inset-right, 0px)',
      '--safe-area-inset-bottom': 'env(safe-area-inset-bottom, 0px)',
      '--safe-area-inset-left': 'env(safe-area-inset-left, 0px)',
    },
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
      src: `url("${ttCommonsDemiBold}") format("woff")`,
    }],
    // Set body and #root defaults
    body: {
      overflowX: 'hidden',
      backgroundColor: theme.palette.bodyBackground,
      color: theme.palette.bodyText,
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.typography.fontSize,
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
      color: theme.palette.bodyText,
    },
  },
}));

/**
 * Component which controls global styles
 * @type {React.NamedExoticComponent<object>}
 */
export const GlobalStyleSheet = memo(() => {
  useStyles();
  return null;
});
