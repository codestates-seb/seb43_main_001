import styled from 'styled-components';

// icons
import { RxHeartFilled } from 'react-icons/rx';

// constants
import { COLOR } from '../../constants';

const { subFontColor } = COLOR;

export const LikeBtnWrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 55px;
  height: 55px;
  position: fixed;
  top: 50%;
  right: 8%;
  border-radius: 50%;
  border: 1px solid ${subFontColor};
  background-color: transparent;
  z-index: 2;
  cursor: pointer;
  &:active,
  &:hover {
    border: 1px solid red;
    svg {
      color: red;
    }
  }
`;

export const LikeIcon = styled(RxHeartFilled)`
  font-size: 40px;
  color: ${subFontColor};

  @media ${({ theme }) => theme.breakpoints.TABLETMIN} {
    font-size: 33px;
  }
`;
