import { DefaultTheme } from 'styled-components';
import { SIZE } from '../constants/index';

declare module 'styled-components' {
  export interface DefaultTheme {
    value: string;
    themeStyle: {
      backgroundColor: string;
      fontColor: string;
      cardColor: string;
      inputColor: string;
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
    inputColor: '#ffffff',
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
    inputColor: '#303030',
  },
  breakpoints: {
    TABLETMIN: `screen and (min-width: ${SIZE.tablet})`,
    DESKTOPMIN: `screen and (min-width: ${SIZE.desktop})`,
  },
} as const;
