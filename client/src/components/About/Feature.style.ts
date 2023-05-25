import styled from 'styled-components';
import { COLOR } from '../../constants/index';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  :not(:last-child) {
    margin-bottom: 60px;
  }

  @media ${({ theme }) => theme.breakpoints.TABLETMIN} {
    flex-direction: row;
    align-items: flex-start;
    gap: 30px;
  }

  @media ${({ theme }) => theme.breakpoints.DESKTOPMIN} {
  }
`;

export const IconWrapper = styled.div`
  width: 80px;
  height: 80px;
  background-color: #fff;
  border-radius: 15px;
  margin: 0 0 30px 0;

  img {
    border-radius: 15px;
  }
`;

export const FeatureContent = styled.div`
  max-width: 260px;
  text-align: center;

  @media ${({ theme }) => theme.breakpoints.TABLETMIN} {
    max-width: 400px;
    text-align: start;
  }
`;

export const FeatureTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 15px;

  @media ${({ theme }) => theme.breakpoints.DESKTOPMIN} {
    font-size: 24px;
  }
`;

export const Description = styled.p`
  font-size: 14px;
  line-height: 1.5;

  @media ${({ theme }) => theme.breakpoints.DESKTOPMIN} {
    font-size: 16px;
  }
`;
