import styled from 'styled-components';
import { COLOR, MAX_SIZE } from '../../constants/index';

export const SortWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  width: 100%;
  height: 60px;
  padding: 0 15px;
  margin: 0 auto;
  border-bottom: 1px solid ${({ theme }) => theme.themeStyle.sortBorderColor};
  background-color: ${({ theme }) => theme.themeStyle.backgroundColor};

  @media ${({ theme }) => theme.breakpoints.TABLETMIN} {
    padding: 0 40px;
  }

  @media ${({ theme }) => theme.breakpoints.DESKTOPMIN} {
    padding: 0 11px;
    width: ${MAX_SIZE.content};
  }
`;

export const SortButton = styled.button`
  padding: 0;
  color: ${COLOR.subFontColor};
  font-size: 14px;

  &.select {
    color: ${({ theme }) => theme.themeStyle.fontColor};
    font-weight: 700;
  }
`;
