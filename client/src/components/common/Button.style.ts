import styled from 'styled-components';
import { COLOR } from '../../constants/index';

const { mainColor } = COLOR;

export const YellowBtn = styled.button`
  width: 100px;
  height: 39px;
  background-color: ${mainColor};
  border: none;
  border-radius: 8px;
  font-size: 1.2rem;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    //원하시는 분이 추가하는 걸로
  }

  @media ${(props) => props.theme.breakpoints.DESKTOPMIN} {
    width: 110px;
  }
`;
