import styled from 'styled-components';
import { MAX_SIZE } from '../../constants';

export const Section = styled.div`
  width: 100%;
  padding: 70px 15px;

  @media ${({ theme }) => theme.breakpoints.TABLETMIN} {
    padding: 70px 40px;
  }

  @media ${({ theme }) => theme.breakpoints.DESKTOPMIN} {
    padding: 70px 10px;
  }
`;
