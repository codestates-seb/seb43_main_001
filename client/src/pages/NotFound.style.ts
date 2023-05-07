import styled from 'styled-components';
import { YellowBtn } from '../components/common/button.style';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100vh - 107px);

  h1 {
    font-size: 140px;
    font-weight: 900;

    @media ${({ theme }) => theme.breakpoints.TABLETMIN} {
      font-size: 250px;
    }
  }

  h2 {
    margin-bottom: 10px;
    font-size: 33px;
    font-weight: 700;

    @media ${({ theme }) => theme.breakpoints.TABLETMIN} {
      font-size: 50px;
    }
  }

  p {
    margin-bottom: 33px;
    font-size: 15px;
  }
`;

export const HomeButton = styled(YellowBtn)`
  width: 80px;
  font-size: 14px;
  font-weight: 700;

  @media ${({ theme }) => theme.breakpoints.TABLETMIN} {
    height: 49px;
    font-size: 20px;
  }
`;
