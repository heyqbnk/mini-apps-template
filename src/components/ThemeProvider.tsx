import React, {
  memo,
  useMemo,
  ReactNode,
  ReactNodeArray,
} from 'react';

import MuiThemeProvider from '@material-ui/styles/ThemeProvider';

import defaultTheme from '../theme/defaultTheme';

interface IProps {
  children?: ReactNode | ReactNodeArray;
}

/**
 * Провайдер темы для приложения.
 * @type {React.NamedExoticComponent<IProps>}
 */
const ThemeProvider = memo((props: IProps) => {
  const {children} = props;
  // TODO: Переключаться между темами в зависимости от того, какая тема
  //  записана в appConfig.
  const theme = useMemo(() => defaultTheme, []);

  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
});

export default ThemeProvider;
