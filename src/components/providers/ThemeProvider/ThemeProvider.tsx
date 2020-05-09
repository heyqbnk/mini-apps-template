import React, {memo, useEffect, useMemo, useState} from 'react';

import MuiThemeProvider from '@material-ui/styles/ThemeProvider';

import {brightLightTheme, spaceGrayTheme, Theme} from '../../../theme';
import {themeContext} from './context';

import {AppearanceSchemeType, AppearanceType} from '@vkontakte/vk-bridge';
import {ThemeProviderProps} from './types';

const {Provider} = themeContext;

/**
 * Theme provider for application
 * @type {React.NamedExoticComponent<Props>}
 */
export const ThemeProvider = memo(
  function ThemeProvider(props: ThemeProviderProps) {
    const {
      children, scheme: parentScheme, appearance: parentAppearance,
    } = props;

    const [appearance, setAppearance] =
      useState<AppearanceType>(parentAppearance || 'light');
    const [scheme, setScheme] =
      useState<AppearanceSchemeType>(parentScheme || 'bright_light');

    const themesMap: Record<AppearanceSchemeType, Theme> = useMemo(() => ({
      client_light: brightLightTheme,
      bright_light: brightLightTheme,
      client_dark: spaceGrayTheme,
      space_gray: spaceGrayTheme,
    }), []);
    const theme = useMemo(() => themesMap[scheme], [themesMap, scheme]);

    const context = useMemo(() => ({
      theme,
      scheme,
      appearance,
      setAppearance,
      setScheme,
    }), [theme, scheme, appearance]);

    // Update values passed from parent
    useEffect(() => {
      if (parentScheme) {
        setScheme(parentScheme);
      }
      if (appearance) {
        setAppearance(appearance);
      }
    }, [parentScheme, appearance]);

    return (
      <Provider value={context}>
        <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
      </Provider>
    );
  },
);
