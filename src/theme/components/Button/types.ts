export interface ButtonColor {
  backgroundColor: string;
  foregroundColor: string;
}

export interface ButtonColors {
  primary: ButtonColor;
  secondary: ButtonColor;
}

export type ButtonColorType = keyof ButtonColors;

export interface ButtonTheme {
  colors: ButtonColors;
}
