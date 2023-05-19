import styled from 'styled-components';
import { MAX_SIZE } from '../constants/index';

export const Container = styled.div`
  width: 100%;
`;

export const ContentWrapper = styled.section`
  padding: 0 15px 40px 15px;
  margin: 0 auto;
  text-align: center;

  @media ${({ theme }) => theme.breakpoints.TABLETMIN} {
    padding: 0 40px 40px 40px;
  }

  @media ${({ theme }) => theme.breakpoints.DESKTOPMIN} {
    padding: 0 10px 40px 10px;
    width: ${MAX_SIZE.content};
  }
`;

export const CardWrapper = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(1, 1fr);

  @media ${({ theme }) => theme.breakpoints.TABLETMIN} {
    grid-template-columns: repeat(2, 1fr);
  }

  @media ${({ theme }) => theme.breakpoints.DESKTOPMIN} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const Target = styled.div`
  height: 1px;
`;
