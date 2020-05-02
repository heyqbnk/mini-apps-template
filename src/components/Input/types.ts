import {InputHTMLAttributes} from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
}

export interface InputColors {
  foreground: string;
  placeholder: string;
}

export interface InputTheme {
  colors: InputColors;
}
