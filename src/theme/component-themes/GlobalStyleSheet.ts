import {OS} from '../../types';
import {panelBrightLightTheme, panelSpaceGrayTheme} from './Panel';

export interface GlobalStyleSheetTheme {
  backgroundColor: string;
  foregroundColor: string;
  getFontFamily(os: OS): string;
  fontSize: number;
}

function getFontFamily(os: OS) {
  return os === OS.IOS
    ? '-apple-system, Helvetica Neue, Arial'
    : 'Roboto, Arial';
}

export const globalStyleSheetBrightLightTheme: GlobalStyleSheetTheme = {
  backgroundColor: panelBrightLightTheme.backgroundColor,
  foregroundColor: 'black',
  getFontFamily,
  fontSize: 16,
};

export const globalStyleSheetSpaceGrayTheme: GlobalStyleSheetTheme = {
  backgroundColor: panelSpaceGrayTheme.backgroundColor,
  foregroundColor: '#e1e3e6',
  getFontFamily,
  fontSize: 16,
};
