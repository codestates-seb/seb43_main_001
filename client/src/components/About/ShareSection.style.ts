import styled from 'styled-components';
import { COLOR } from '../../constants/index';
import { YellowBtn } from '../common/Button.style';
import { Section } from './Section.style';

export const ShareSection = styled(Section)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
`;

export const SubTitle = styled.h2`
  font-size: 28px;
  font-weight: 700;
  text-align: center;
  word-break: keep-all;
`;

export const ShareButton = styled(YellowBtn)`
  width: 110px;
  height: 50px;
`;
