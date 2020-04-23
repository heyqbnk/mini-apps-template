import {Theme} from '../../theme/types';
import {OS} from '../../types';

/**
 * Extends theme with operating system specifics
 * @param {Theme} theme
 * @param {OS} os
 * @returns {Theme}
 */
export function extendThemeWithOS(theme: Theme, os: OS): Theme {
  return {
    ...theme,
    typography: {
      ...theme.typography,
      fontFamily: os === OS.IOS
        ? '-apple-system, Helvetica Neue, Arial'
        : 'Roboto, Arial',
    },
  };
}
