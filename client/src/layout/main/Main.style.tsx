import styled from 'styled-components';
import { MAX_SIZE } from '../../constants/index';

const { content } = MAX_SIZE;

export const Container = styled.main`
  margin-top: 65px;

  //1200px 이상 일 때 적용
  @media ${(props) => props.theme.breakpoints.DESKTOPMIN} {
    max-width: ${content};
  }
  @media ${(props) => props.theme.breakpoints.TABLETMIN} {
  }
`;
