import styled from 'styled-components';
import { MAX_SIZE } from '../../constants/index';
import { Section } from './Section.style';

export const LandingSection = styled(Section)`
  @media ${({ theme }) => theme.breakpoints.DESKTOPMIN} {
    width: ${MAX_SIZE.content};
    margin: 0 auto;
  }
`;

export const Title = styled.h1`
  margin-bottom: 20px;
  font-size: 28px;
  font-weight: 700;
  text-align: center;
  word-break: keep-all;

  @media ${({ theme }) => theme.breakpoints.DESKTOPMIN} {
    font-size: 48px;
  }
`;

export const Description = styled.p`
  margin-bottom: 40px;
  font-size: 16px;
  line-height: 1.7;
  text-align: center;
  word-break: keep-all;

  @media ${({ theme }) => theme.breakpoints.DESKTOPMIN} {
    font-size: 20px;
  }
`;
