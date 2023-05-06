import styled from 'styled-components';
import { RxChevronUp } from 'react-icons/rx';

export const ArrowUpWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.themeStyle.cardColor};
  box-shadow: 0px 8px 15px -4px rgba(0, 0, 0, 0.25);
  cursor: pointer;

  @media ${({ theme }) => theme.breakpoints.TABLETMIN} {
    width: 50px;
    height: 50px;
  }
`;

export const ArrowUpIcon = styled(RxChevronUp)`
  font-size: 30px;

  @media ${({ theme }) => theme.breakpoints.TABLETMIN} {
    font-size: 33px;
  }
`;
