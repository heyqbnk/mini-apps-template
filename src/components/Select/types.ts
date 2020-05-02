import {SelectHTMLAttributes} from 'react';

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
}

export interface SelectColors {
  foreground: string;
  placeholder: string;
  icon: string;
}

export interface SelectTheme {
  colors: SelectColors;
}
