import React, {memo, useMemo} from 'react';

import MuiThemeProvider from '@material-ui/styles/ThemeProvider';

import {brightLightTheme, spaceGrayTheme, Theme} from '../../theme';
import useSelector from '../../hooks/useSelector';

import {AppearanceSchemeType} from '@vkontakte/vk-bridge';
import {extendThemeWithOS} from './utils';

/**
 * Theme provider for application
 * @type {React.NamedExoticComponent<Props>}
 */
export const ThemeProvider = memo(props => {
  const {scheme, os} = useSelector(state => ({
    scheme: state.appConfig.scheme,
    os: state.device.os,
  }));
  const brightWithOS = useMemo(
    () => extendThemeWithOS(brightLightTheme, os), [os]
  );
  const spaceWithOS = useMemo(
    () => extendThemeWithOS(spaceGrayTheme, os), [os]
  );
  const themesMap: Record<AppearanceSchemeType, Theme> = useMemo(() => ({
    client_light: brightWithOS,
    bright_light: brightWithOS,
    client_dark: spaceWithOS,
    space_gray: spaceWithOS,
  }), [brightWithOS, spaceWithOS]);
  const theme = useMemo(() => themesMap[scheme], [themesMap, scheme]);

  return <MuiThemeProvider theme={theme}>{props.children}</MuiThemeProvider>;
});
