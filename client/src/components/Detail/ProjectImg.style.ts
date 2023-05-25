import styled, { css } from 'styled-components';
import { COLOR } from '../../constants';

// icons
import { RxHeartFilled } from 'react-icons/rx';
import { IoMdEye } from 'react-icons/io';

const { subFontColor } = COLOR;

export const Wrapper = styled.section`
  margin-top: 2rem;
  position: relative;
`;
export const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
`;

export const IconSection = styled.div`
  display: flex;
  gap: 5px;
  position: absolute;
  right: 15px;
  bottom: 15px;
  & span {
    color: black;
    font-size: 1rem;
    margin-left: 3px;
    margin-bottom: 3px;
  }
  .view-icon {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .like-icon {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const CommonIconStyle = css`
  color: ${subFontColor};
  font-size: 2rem;
`;

export const ViewIcon = styled(IoMdEye)`
  ${CommonIconStyle}
  font-size: 19px;
  @media ${({ theme }) => theme.breakpoints.DESKTOPMIN} {
    font-size: 30px;
  }
`;

export const LikeIcon = styled(RxHeartFilled)`
  ${CommonIconStyle}
  font-size: 15px;
  @media ${({ theme }) => theme.breakpoints.DESKTOPMIN} {
    font-size: 24px;
  }
`;
