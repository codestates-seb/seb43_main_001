import styled from 'styled-components';

export const Container = styled.main`
  margin-top: 65px;
  margin-bottom: 39px;

  //1200px 이상 일 때 적용
  @media ${(props) => props.theme.breakpoints.DESKTOPMIN} {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  @media ${(props) => props.theme.breakpoints.TABLETMIN} {
  }
`;
