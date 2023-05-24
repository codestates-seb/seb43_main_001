import styled from 'styled-components';
import * as S from './TextBox.style';
import { ImgSelector } from './ImgBox.style';
import { COLOR } from '../../constants';

const { mainColor, subFontColor } = COLOR;

export const TagContainer = styled(S.TextContainer)`
  position: relative;
`;

export const Title = styled(S.Title)``;

export const TagEditor = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding: 0.1rem 0.2rem;
  color: ${subFontColor};

  border-radius: 10px;
  border: none;
  box-shadow: 0 0.3rem 0.3rem 0
    ${(props) => (props.theme.value === 'light' ? subFontColor : 'none')};

  background-color: ${(props) => props.theme.themeStyle.inputColor};

  > ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    margin: 8px 0 0 0;

    > .tag {
      width: auto;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: black;
      padding: 0 8px;
      list-style: none;
      border-radius: 6px;
      margin: 0 8px 8px 0;
      background: ${mainColor};
      > .tag-close-icon {
        margin-left: 0.5rem;
        font-weight: bold;
        cursor: pointer;
      }
    }
  }
`;

export const TagInput = styled.input`
  flex: 1;
  :focus {
    outline: transparent;
  }
  border: none;
  background-color: transparent;
  height: 60px;
  padding: 0.5rem;
`;

export const AutoSearchWrap = styled.ul`
  position: absolute;
  top: 100%;
  width: 100%;
  border-radius: 10px;
  font-family: 'Noto Sans KR', sans-serif;
  //border: solid black 0.1rem;
  box-shadow: 0 0.3rem 0.3rem 0
    ${(props) => (props.theme.value === 'light' ? subFontColor : 'none')};
  background-color: ${(props) => props.theme.themeStyle.backgroundColor};
`;

export const AutoSearchData = styled.li`
  padding: 10px 8px;
  width: 100%;
  font-size: 1rem;
  font-weight: bold;
  z-index: 4;
  letter-spacing: 2px;
  border-radius: 10px;
  &:hover {
    background-color: ${mainColor};
    cursor: pointer;
  }
  position: relative;
`;
export const caution = styled.span`
  color: red;
  font-size: 0.5rem;
  padding: 0.5rem;
  font-weight: 500;
  @media ${(props) => props.theme.breakpoints.TABLETMIN} {
    font-size: 0.7rem;
  }
  @media ${(props) => props.theme.breakpoints.DESKTOPMIN} {
    font-size: 0.9rem;
  }
`;
