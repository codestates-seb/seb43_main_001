import styled from 'styled-components';
import { COLOR } from '../../constants';
import { RxHeartFilled } from 'react-icons/rx';
import { IoMdEye } from 'react-icons/io';
import { Tags } from './YellowTag.style';

export const Container = styled.article`
  width: 100%;
  height: 100%;
  border: 1px solid ${({ theme }) => theme.themeStyle.cardBorderColor};
  border-radius: 12px;
  background-color: ${({ theme }) => theme.themeStyle.cardColor};
  box-shadow: 0px 10px 30px -20px rgba(0, 0, 0, 0.25);
  transition: transform 300ms;

  :hover {
    transform: scale(1.02);
    cursor: pointer;
  }
`;

export const Thumbnail = styled.div`
  width: 100%;
  height: 196px;
  border-radius: 12px 12px 0 0;
  overflow: hidden;

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100% - 196px);
  padding: 35px 40px;
  text-align: left;
`;

export const CardContentWrapper = styled.div`
  h1 {
    margin-bottom: 11px;
    color: ${({ theme }) => theme.themeStyle.fontColor};
    font-size: 18px;
    font-weight: 700;
    // 2줄 이상이면 말줄임
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  p {
    margin-bottom: 23px;
    color: ${({ theme }) => theme.themeStyle.cardFontColor};
    font-size: 13px;

    @media ${({ theme }) => theme.breakpoints.DESKTOPMIN} {
      margin-bottom: 20px;
    }
  }
`;

export const CardInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const UserImage = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: transparent;
  overflow: hidden;

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const UserName = styled.strong`
  margin-left: 5px;
  font-size: 14px;
`;

export const TagWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
`;

export const Tag = styled(Tags)`
  padding: 3px 7px;
  font-size: 12px;
`;

export const PostInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  div {
    display: flex;
    align-items: center;
    gap: 2px;
  }

  span {
    font-size: 13px;
    color: ${COLOR.subFontColor};

    @media ${({ theme }) => theme.breakpoints.DESKTOPMIN} {
      font-size: 15px;
    }
  }
`;

export const ViewIcon = styled(IoMdEye)`
  color: ${COLOR.subFontColor};

  @media ${({ theme }) => theme.breakpoints.DESKTOPMIN} {
    font-size: 19px;
  }
`;

export const LikeIcon = styled(RxHeartFilled)`
  color: ${COLOR.subFontColor};
  font-size: 14px;

  @media ${({ theme }) => theme.breakpoints.DESKTOPMIN} {
    font-size: 16px;
  }
`;
