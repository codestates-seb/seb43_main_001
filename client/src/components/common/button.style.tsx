import styled from 'styled-components';
import { COLOR } from '../../constants/index';

const { mainColor } = COLOR;

export const YellowBtn = styled.button`
  width: 122px;
  height: 39px;
  background-color: ${mainColor};
  border: none;
  border-radius: 5px;
  font-size: 1.2rem;
  font-weight: 800;
  cursor: pointer;
`;
