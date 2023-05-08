import styled from 'styled-components';
import { MAX_SIZE } from '../constants/index';
const { content } = MAX_SIZE;

export const User = styled.div`
  width: 100%;
  padding: 0 15px;
  display: flex;
  overflow: hidden;
  button {
    padding: 0;
    font-size: 1rem;
  }
  a {
    padding: 0;
    font-size: 1rem;
    color: ${(props) => props.theme.themeStyle.fontColor};
  }
  svg {
    margin-right: 5px;
  }
  // 태블릿 사이즈 이상일 때
  @media ${(props) => props.theme.breakpoints.TABLETMIN} {
    padding: 0 40px;
  }
  @media ${(props) => props.theme.breakpoints.DESKTOPMIN} {
    max-width: ${content};
    margin: 0 auto;
  }
`;
export const WebPortfolioContainer = styled.div`
  display: none;
  height: 110vh;
  margin-left: 20px;
  width: 65%;
  @media ${(props) => props.theme.breakpoints.DESKTOPMIN} {
    display: block;
  }
`;
