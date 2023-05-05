import { DefaultTheme } from 'styled-components';
import { SIZE } from '../constants/index';

declare module 'styled-components' {
  export interface DefaultTheme {
    value: string;
    themeStyle: {
      backgroundColor: string;
      fontColor: string;
      cardColor: string;
      cardFontColor: string;
      cardBorderColor: string;
      inputColor: string;
      toggleColor: string;
      inputBorderColor: string;
      togglePosition: string;
      toggleIconPosition: string;
    };
    breakpoints: {
      TABLETMIN: string;
      DESKTOPMIN: string;
    };
  }
}

export const lightTheme: DefaultTheme = {
  value: 'light',
  themeStyle: {
    backgroundColor: '#ffffff',
    fontColor: '#000000',
    cardColor: '#ffffff',
    cardFontColor: '#303030',
    cardBorderColor: 'rgba(243, 243, 243, 0.8)',
    inputColor: '#ffffff',
    toggleColor: '#ccc',
    inputBorderColor: '#000000',
    togglePosition: '30px',
    toggleIconPosition: '5px',
  },
  breakpoints: {
    TABLETMIN: `screen and (min-width: ${SIZE.tablet})`,
    DESKTOPMIN: `screen and (min-width: ${SIZE.desktop})`,
  },
} as const;

export const darkTheme: DefaultTheme = {
  value: 'dark',
  themeStyle: {
    backgroundColor: '#000000',
    fontColor: '#ffffff',
    cardColor: '#303030',
    cardFontColor: '#C4C4C4',
    cardBorderColor: '#303030',
    inputColor: '#303030',
    toggleColor: '#303030',
    inputBorderColor: '#ffffff',
    togglePosition: '2px',
    toggleIconPosition: '32px',
  },
  breakpoints: {
    TABLETMIN: `screen and (min-width: ${SIZE.tablet})`,
    DESKTOPMIN: `screen and (min-width: ${SIZE.desktop})`,
  },
} as const;
