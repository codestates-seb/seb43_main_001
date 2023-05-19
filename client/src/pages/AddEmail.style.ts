import styled from 'styled-components';
import * as S from './NewPortfolio.style';
import * as P from '../components/Portfolio/PortfolioContainer.style';

export const AddEmailContainer = styled(S.NewPortfolioContainer)`
  height: calc(100vh - 107px);
`;
export const AddEmailLayout = styled(P.PortfolioLayout)``;

export const PageTitle = styled.span`
  display: flex;
  align-items: center;
  text-align: center;
  font-size: 1.5rem;
  margin-bottom: 40px;
  margin-top: 40px;
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
