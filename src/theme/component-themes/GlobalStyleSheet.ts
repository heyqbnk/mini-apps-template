import {OS} from '../../types';

export interface GlobalStyleSheetTheme {
  textColor: string;
  getFontFamily(os: OS): string;
  fontSize: number;
}

function getFontFamily(os: OS) {
  return os === OS.IOS
    ? '-apple-system, Helvetica Neue, Arial'
    : 'Roboto, Arial';
}

export const globalStyleSheetBrightLightTheme: GlobalStyleSheetTheme = {
  textColor: 'black',
  getFontFamily,
  fontSize: 16,
};

export const globalStyleSheetSpaceGrayTheme: GlobalStyleSheetTheme = {
  textColor: '#e1e3e6',
  getFontFamily,
  fontSize: 16,
};
