import styled from 'styled-components';
import { StyledLoading } from '../components/common/Loading.style';
// constants
import { MAX_SIZE } from '../constants/index';

const { content } = MAX_SIZE;

export const Container = styled.main`
  width: 100%;
  padding: 0 15px;
  padding-top: 1rem;
  flex: 0 1 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 5rem;
  @media ${(props) => props.theme.breakpoints.TABLETMIN} {
    padding: 1rem 40px 0 40px;
  }

  @media ${(props) => props.theme.breakpoints.DESKTOPMIN} {
    max-width: ${content};
  }
`;

export const LoadingContainer = styled.main`
  width: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
  margin-top: 10rem;
`;

export const LoadingComponent = styled(StyledLoading)`
  width: 130px;
  height: 130px;
`;
