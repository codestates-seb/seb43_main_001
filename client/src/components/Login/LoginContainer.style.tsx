import styled from 'styled-components';
import { COLOR } from '../../constants';
import { lightTheme } from '../../style/theme';

const { mainColor } = COLOR;
const { TABLETMIN, DESKTOPMIN } = lightTheme.breakpoints;

export const LoginLayout = styled.div`
  height: 90vh;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const ProjectName = styled.span`
  display: flex;
  align-items: center;
  text-align: center;
  font-size: 1.9rem;
  margin-bottom: 75px;
  margin-top: 40px;
  > img {
    height: 50px;
    width: 50px;
    margin-right: 10px;
  }
  @media ${TABLETMIN} {
    margin-top: 60px;
  }
  @media ${DESKTOPMIN} {
    margin-top: 120px;
  }
`;

export const Title = styled.span`
  text-align: center;
  color: ${mainColor};
  font-size: 1.3rem;
  margin-bottom: 10px;
  @media ${TABLETMIN} {
    font-size: 1.9rem;
    margin-bottom: 100px;
  }
  @media ${DESKTOPMIN} {
    font-size: 1.9rem;
    margin-bottom: 65px;
  }
`;

export const Detail = styled.p`
  text-align: center;
  font-size: 0.9rem;
  /* width: 420px; */
  margin-bottom: 40px;
  @media ${TABLETMIN} {
    font-size: 1.5rem;
    margin-bottom: 120px;
  }
  @media ${DESKTOPMIN} {
    font-size: 1.5rem;
    margin-bottom: 100px;
  }
`;
