import styled from 'styled-components';
import * as S from './NewPortfolio.style';
import * as P from '../components/Portfolio/PortfolioContainer.style';

// constant
import { COLOR } from '../constants';

const { mainColor } = COLOR;

export const AddEmailContainer = styled(S.NewPortfolioContainer)`
  height: calc(100vh - 107px);
`;
export const AddEmailLayout = styled(P.PortfolioLayout)`
  .email__check {
    position: relative;
  }
`;

export const PageTitle = styled.span`
  display: flex;
  align-items: center;
  text-align: center;
  font-size: 1.5rem;
  margin-bottom: 25px;
  font-weight: bold;
  @media ${(props) => props.theme.breakpoints.TABLETMIN} {
    font-size: 1.8rem;
    margin-bottom: 60px;
  }
  @media ${(props) => props.theme.breakpoints.DESKTOPMIN} {
    font-size: 2rem;
    margin-bottom: 80px;
  }
`;
export const caution = styled.span`
  color: red;
  font-size: 0.5rem;
  padding: 0.5rem;
  font-weight: 500;
  @media ${(props) => props.theme.breakpoints.TABLETMIN} {
    font-size: 0.7rem;
  }
  @media ${(props) => props.theme.breakpoints.DESKTOPMIN} {
    font-size: 0.9rem;
  }
`;
export const ButtonContainer = styled(P.ButtonContainer)``;
export const SubmitBtn = styled(P.SubmitBtn)``;

export const checkDuplicateEmailButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  width: 50px;
  height: 30px;
  border-radius: 8px;
  background-color: ${mainColor};
  font-size: 5px;
  font-weight: bold;
`;
