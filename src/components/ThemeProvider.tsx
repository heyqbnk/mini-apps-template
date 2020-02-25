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

const ThemeProvider = memo((props: IProps) => {
  const {children} = props;
  // TODO: Switch between themes according to current Appearance.
  const theme = useMemo(() => defaultTheme, []);

  return (
    <MuiThemeProvider theme={theme}>
      {children}
    </MuiThemeProvider>
  );
});

export default ThemeProvider;
