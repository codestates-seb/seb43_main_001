import styled from 'styled-components';
import { RxChevronUp } from 'react-icons/rx';

export const ArrowUpWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 45px;
  height: 45px;
  position: fixed;
  bottom: 60px;
  right: 20px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.themeStyle.backgroundColor};
  box-shadow: 0px 8px 15px -4px rgba(0, 0, 0, 0.25);
  opacity: 0;
  pointer-events: none;
  cursor: pointer;
  transition: opacity 300ms;

  &.visible {
    opacity: 1;
    pointer-events: auto;
  }

  @media ${({ theme }) => theme.breakpoints.TABLETMIN} {
    width: 50px;
    height: 50px;
    right: 45px;
  }

  @media ${({ theme }) => theme.breakpoints.DESKTOPMIN} {
    border: 1px solid
      ${({ theme }) => (theme.value === 'dark' ? 'rgba(243, 243, 243, 0.4)' : 'none')};
  }
`;

export const ArrowUpIcon = styled(RxChevronUp)`
  font-size: 30px;

  @media ${({ theme }) => theme.breakpoints.TABLETMIN} {
    font-size: 33px;
  }
`;
