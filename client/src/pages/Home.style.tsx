import styled from 'styled-components';
import { MAX_SIZE } from '../constants/index';

export const Container = styled.div`
  width: 100%;
`;

export const Banner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 508px;
  padding: 0 15px;
  color: #000;
  background-color: #f0f0f0;
  text-align: center;

  h1 {
    margin-bottom: 20px;
    font-size: 50px;
    font-weight: 700;
  }

  p {
    margin-bottom: 55px;
    font-size: 20px;
    font-weight: 400;
  }

  @media ${({ theme }) => theme.breakpoints.TABLETMIN} {
    height: 650px;

    p {
      font-size: 24px;
    }
  }

  @media ${({ theme }) => theme.breakpoints.DESKTOPMIN} {
    height: 700px;

    h1 {
      font-size: 68px;
    }
  }
`;

export const ContentWrapper = styled.div`
  padding: 0 15px;
  margin: 0 auto;

  @media ${({ theme }) => theme.breakpoints.TABLETMIN} {
    padding: 0 40px;
  }

  @media ${({ theme }) => theme.breakpoints.DESKTOPMIN} {
    padding: 0 10px;
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
