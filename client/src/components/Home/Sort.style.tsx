import styled from 'styled-components';
import { COLOR } from '../../constants';

export const SortWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  width: 100%;
  height: 60px;
  border-bottom: 1px solid ${({ theme }) => theme.themeStyle.sortBorderColor};
  background-color: ${({ theme }) => theme.themeStyle.backgroundColor};
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
