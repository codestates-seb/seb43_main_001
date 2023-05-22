import styled from 'styled-components';

// constants
import { COLOR } from '../../constants';

const { mainColor } = COLOR;

export const StyledLoading = styled.div`
  display: inline-block;
  position: relative;
  margin: 8rem auto;
  &::after {
    content: '';
    display: block;
    border-radius: 50%;
    width: 100px;
    height: 100px;
    margin: 8px;
    box-sizing: border-box;
    border: 32px solid ${mainColor};
    border-color: ${mainColor} transparent ${mainColor} transparent;
    animation: loading 1.5s infinite;
  }

  @keyframes loading {
    0% {
      transform: rotate(0);
      animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
    }
    50% {
      transform: rotate(900deg);
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }
    100% {
      transform: rotate(1800deg);
    }
  }
`;
