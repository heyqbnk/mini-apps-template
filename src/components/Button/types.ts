import {ButtonHTMLAttributes, ReactNode} from 'react';
import {ButtonColorType} from '../../theme';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  before?: ReactNode;
  after?: ReactNode;
  color?: ButtonColorType;
  href?: string;
  fullWidth?: boolean;
  size?: 'm' | 'l' | 'xl';
}

export interface Ripple {
  id: string;
  coords: {
    x: number;
    y: number;
  };
  removeTimeoutId: number | null;
}
