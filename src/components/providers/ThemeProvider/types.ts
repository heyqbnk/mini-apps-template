import {ReactNode} from 'react';
import {AppearanceSchemeType, AppearanceType} from '@vkontakte/vk-bridge';
import {Theme} from '../../../theme/types';

export interface ThemeContext {
  theme: Theme;
  appearance: AppearanceType;
  scheme: AppearanceSchemeType;
  setScheme(scheme: AppearanceSchemeType): void;
  setAppearance(appearance: AppearanceType): void;
}

export interface ThemeProviderProps {
  scheme?: AppearanceSchemeType;
  appearance?: AppearanceType;
  children: ReactNode;
}
