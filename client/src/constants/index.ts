export const SIZE = {
  tablet: '768px', // 768이상부터 적용
  desktop: '1200px', // 1200이상부터 적용
} as const;

export const MAX_SIZE = {
  content: '1140px', // desktop일 때 최대 길이 지정
} as const;

export const COLOR = {
  mainColor: '#DCF247', // yellow
  subFontColor: '#C4C4C4', // deep grey
  divider: '#F3F3F3', // light grey
  cardColor: '#303030', // charcoal
} as const;
export const THEME = {
  dark: 'dark',
  light: 'light',
} as const;

export const URL = {
  refreshUrl: `${process.env.REACT_APP_API_URL}/auth/refresh`,
};
