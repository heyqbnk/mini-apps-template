import React, {memo, useMemo} from 'react';

import MuiThemeProvider from '@material-ui/styles/ThemeProvider';

import {brightLightTheme, spaceGrayTheme, Theme} from '../../theme';
import {useSelector} from '../../hooks';

import {AppearanceSchemeType} from '@vkontakte/vk-bridge';

/**
 * Theme provider for application
 * @type {React.NamedExoticComponent<Props>}
 */
export const ThemeProvider = memo(props => {
  const scheme = useSelector(state => state.appConfig.scheme);

  const themesMap: Record<AppearanceSchemeType, Theme> = useMemo(() => ({
    client_light: brightLightTheme,
    bright_light: brightLightTheme,
    client_dark: spaceGrayTheme,
    space_gray: spaceGrayTheme,
  }), []);
  const theme = useMemo(() => themesMap[scheme], [themesMap, scheme]);

  return <MuiThemeProvider theme={theme}>{props.children}</MuiThemeProvider>;
});
