import styled from 'styled-components';
import { COLOR, MAX_SIZE } from '../../constants';

const { mainColor, subFontColor } = COLOR;

const { content } = MAX_SIZE;
export const PortfolioLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 100%;
  margin: 5rem 0;

  @media ${(props) => props.theme.breakpoints.TABLETMIN} {
    padding: 0 50px;
  }

  @media ${(props) => props.theme.breakpoints.DESKTOPMIN} {
    max-width: ${content};
    padding: 0 85px;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: end;
  gap: 0.5rem;
`;

export const SubmitBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.8rem;
  font-weight: 500;
  background-color: ${mainColor};
  border-radius: 10px;
  padding: 1rem 0.6rem;
  height: 30px;

  @media ${(props) => props.theme.breakpoints.TABLETMIN} {
    font-size: 1rem;
    padding: 1.2rem 0.8rem;
    height: 40px;
  }

  @media ${(props) => props.theme.breakpoints.DESKTOPMIN} {
    max-width: ${content};
    padding: 1.4rem 1rem;
    font-size: 1.2rem;
  }
`;

export const PrevBtn = styled(SubmitBtn)`
  background-color: ${subFontColor};
  color: white;
`;
