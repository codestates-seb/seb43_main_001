import styled, { css } from 'styled-components';
import { StyledLoading } from '../components/common/Loading.style';
// constants
import { MAX_SIZE, COLOR } from '../constants/index';

// icons
import { RxHeartFilled } from 'react-icons/rx';
import { IoMdEye } from 'react-icons/io';

const { content } = MAX_SIZE;
const { subFontColor } = COLOR;

export const Container = styled.main`
  width: 100%;
  padding: 0 15px;
  padding-top: 1rem;
  flex: 0 1 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 5rem;
  @media ${(props) => props.theme.breakpoints.TABLETMIN} {
    padding: 1rem 40px 0 40px;
  }

  @media ${(props) => props.theme.breakpoints.DESKTOPMIN} {
    max-width: ${content};
  }
`;

export const LoadingContainer = styled.main`
  width: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
  margin-top: 10rem;
`;

export const LoadingComponent = styled(StyledLoading)`
  width: 130px;
  height: 130px;
`;

export const CreateAndViews = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const IconSection = styled.div`
  display: flex;
  gap: 5px;
  right: 15px;
  bottom: 15px;
  /* margin-right: 0.8rem; */
  & span {
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
