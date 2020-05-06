export interface ButtonColors {
  backgroundColor: string;
  foregroundColor: string;
  borderColor: string;
  rippleColor: string;
}

export interface ButtonVariant {
  colors: ButtonColors;
}

export interface ButtonTheme {
  primary: ButtonVariant;
  secondary: ButtonVariant;
  tertiary: ButtonVariant;
  outline: ButtonVariant;
}

export const buttonBrightLightTheme: ButtonTheme = {
  primary: {
    colors: {
      backgroundColor: '#4986cc',
      borderColor: 'transparent',
      foregroundColor: 'white',
      rippleColor: 'rgba(30,51,78,0.2)',
    },
  },
  secondary: {
    colors: {
      backgroundColor: '#001d3d0d',
      borderColor: 'transparent',
      foregroundColor: '#3f8ae0',
      rippleColor: 'rgba(127,127,127,.2)',
    },
  },
  tertiary: {
    colors: {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      foregroundColor: '#4986cc',
      rippleColor: 'rgba(58,105,160,0.2)',
    },
  },
  outline: {
    colors: {
      backgroundColor: 'transparent',
      borderColor: '#4986cc',
      foregroundColor: '#4986cc',
      rippleColor: 'rgba(58,105,160,0.2)',
    },
  },
};

export const buttonSpaceGrayTheme: ButtonTheme = {
  primary: {
    colors: {
      backgroundColor: '#e1e3e6',
      borderColor: 'transparent',
      foregroundColor: '#454647',
      rippleColor: 'rgba(127,127,127,.2)',
    },
  },
  secondary: {
    colors: {
      backgroundColor: '#454647',
      borderColor: 'transparent',
      foregroundColor: '#e1e3e6',
      rippleColor: 'rgba(127,127,127,.2)',
    },
  },
  tertiary: {
    colors: {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      foregroundColor: '#e1e3e6',
      rippleColor: 'rgba(127,127,127,.2)',
    },
  },
  outline: {
    colors: {
      backgroundColor: 'transparent',
      borderColor: '#e1e3e6',
      foregroundColor: '#e1e3e6',
      rippleColor: 'rgba(127,127,127,.2)',
    },
  },
};
