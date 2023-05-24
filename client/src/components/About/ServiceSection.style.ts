import styled from 'styled-components';
import { COLOR, MAX_SIZE } from '../../constants/index';
import { Section } from './Section.style';

export const ServiceSection = styled(Section)`
  width: 100%;
  background-color: ${({ theme }) => theme.themeStyle.sectionBackgroundColor};
`;
