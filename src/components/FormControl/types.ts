import {HTMLAttributes} from 'react';

export interface FormControlProps extends HTMLAttributes<HTMLDivElement> {
  isFocused?: boolean;
}

export interface FormControlColors {
  background: string;
  border: string;
  borderFocused: string;
}

export interface FormControlTheme {
  colors: FormControlColors;
}
