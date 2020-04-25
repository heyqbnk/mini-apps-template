export interface ButtonColor {
  backgroundColor: string;
  foregroundColor: string;
  borderColor: string;
  rippleColor: string;
}

export interface ButtonColors {
  primary: ButtonColor;
  secondary: ButtonColor;
  tertiary: ButtonColor;
  outline: ButtonColor;
}

export type ButtonColorType = keyof ButtonColors;

export interface ButtonTheme {
  colors: ButtonColors;
}
