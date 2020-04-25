import React, {memo, useMemo} from 'react';

import MuiThemeProvider from '@material-ui/styles/ThemeProvider';

import {brightLightTheme, spaceGrayTheme, Theme} from '../../theme';
import {useSelector} from '../../hooks/useSelector';
import {extendThemeWithOS} from './utils';

import {AppearanceSchemeType} from '@vkontakte/vk-bridge';

/**
 * Theme provider for application
 * @type {React.NamedExoticComponent<Props>}
 */
export const ThemeProvider = memo(props => {
  const {scheme, os} = useSelector(state => ({
    scheme: state.appConfig.scheme,
    os: state.device.os,
  }));
  const {brightTheme, darkTheme} = useMemo(() => ({
    brightTheme: extendThemeWithOS(brightLightTheme, os),
    darkTheme: extendThemeWithOS(spaceGrayTheme, os),
  }), [os]);

  const themesMap: Record<AppearanceSchemeType, Theme> = useMemo(() => ({
    client_light: brightTheme,
    bright_light: brightTheme,
    client_dark: darkTheme,
    space_gray: darkTheme,
  }), [brightTheme, darkTheme]);
  const theme = useMemo(() => themesMap[scheme], [themesMap, scheme]);

  return <MuiThemeProvider theme={theme}>{props.children}</MuiThemeProvider>;
});
