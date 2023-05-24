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
  height: 300px;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const IconSection = styled.div`
  display: flex;
  gap: 5px;
  position: absolute;
  right: 15px;
  bottom: 15px;
  span {
    color: black;
    font-size: 5px;
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
  font-size: 1rem;
`;

export const ViewIcon = styled(IoMdEye)`
  ${CommonIconStyle}

  @media ${({ theme }) => theme.breakpoints.DESKTOPMIN} {
    font-size: 19px;
  }
`;

export const LikeIcon = styled(RxHeartFilled)`
  ${CommonIconStyle}

  @media ${({ theme }) => theme.breakpoints.DESKTOPMIN} {
    font-size: 16px;
  }
`;
