import styled from 'styled-components';

// icons
import { RxHeartFilled } from 'react-icons/rx';

// constants
import { COLOR } from '../../constants';

type LikeBtnWrapperProps = {
  likes: boolean;
};

const { subFontColor } = COLOR;

export const LikeBtnWrapper = styled.section<LikeBtnWrapperProps>`
  /* display: flex;
  justify-content: center;
  align-items: center;
  width: 55px;
  height: 55px;
  position: fixed;
  top: 50%;
  right: 8%;
  border-radius: 50%;
  border: 1px solid ${(props) => (props.likes ? 'red' : `${subFontColor}`)};
  background-color: transparent;
  z-index: 2;
  & svg {
    color: ${(props) => (props.likes ? 'red' : `${subFontColor}`)};
  }
  cursor: pointer;
  &:active,
  &:hover {
    border: 1px solid ${(props) => (props.likes ? `${subFontColor}` : 'red')};
    svg {
      color: ${(props) => (props.likes ? `${subFontColor}` : 'red')};
    }
  } */
`;

export const LikeIcon = styled(RxHeartFilled)<LikeBtnWrapperProps>`
  width: 33px;
  height: 33px;
  position: fixed;
  top: 50%;
  right: 8%;
  cursor: pointer;
  z-index: 2;
  color: ${(props) => (props.likes ? 'red' : `${subFontColor}`)};
  &:active,
  &:hover {
    color: ${(props) => (props.likes ? `${subFontColor}` : 'red')};
  }

  @media ${({ theme }) => theme.breakpoints.TABLETMIN} {
    width: 55px;
    height: 55px;
  }
`;
