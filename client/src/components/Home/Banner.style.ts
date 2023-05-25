import styled from 'styled-components';
import { YellowBtn } from '../common/Button.style';

export const Banner = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 70px;
  padding: 50px 15px;
  width: 100%;
  height: 100%;
  background-color: #f7f7f7;

  @media ${({ theme }) => theme.breakpoints.DESKTOPMIN} {
    flex-direction: row;
    gap: 120px;
    height: 515px;
    padding: 0 15px;
  }
`;

export const BannerContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #000;
  text-align: center;

  h1 {
    margin-bottom: 5px;
    font-size: 40px;
    font-weight: 700;
  }

  h2 {
    margin-bottom: 30px;
    font-size: 17px;
    font-weight: 500;
  }

  @media ${({ theme }) => theme.breakpoints.TABLETMIN} {
    h1 {
      font-size: 48px;
    }

    h2 {
      font-size: 18px;
    }
  }

  @media ${({ theme }) => theme.breakpoints.DESKTOPMIN} {
    text-align: left;
    align-items: flex-start;

    h1 {
      font-size: 68px;
    }
  }
`;

export const ShareButton = styled(YellowBtn)`
  width: 180px;
  height: 60px;
`;

export const BannerImg = styled.div`
  max-width: 300px;
  height: auto;

  img {
    width: 100%;
    height: auto;
  }

  @media ${({ theme }) => theme.breakpoints.TABLETMIN} {
    max-width: 400px;
  }
`;
