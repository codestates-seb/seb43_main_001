import styled from 'styled-components';
import * as S from './TextBox.style';
import { ImgSelector } from './ImgBox.style';
import { COLOR } from '../../constants';

const { mainColor, subFontColor } = COLOR;

export const TagContainer = styled(S.TextContainer)``;

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
