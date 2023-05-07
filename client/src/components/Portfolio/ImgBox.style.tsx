import styled from 'styled-components';
import * as S from './TextBox.style';
import { COLOR } from '../../constants';

const { mainColor, subFontColor } = COLOR;

export const ImgContainer = styled(S.TextContainer)``;

export const Title = styled(S.Title)``;

export const ImgSelector = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  height: 60px;
  border-radius: 10px;
  border: none;
  box-shadow: 0 0.3rem 0.3rem 0
    ${(props) => (props.theme.value === 'light' ? subFontColor : 'none')};

  background-color: ${(props) => props.theme.themeStyle.inputColor};
  .gray-font {
    color: ${subFontColor};
  }
  padding: 0.5rem;
  .file {
    display: none;
  }
`;

export const ImgName = styled.span``;

export const ImgInput = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.8rem;
  background-color: ${mainColor};
  border-radius: 10px;
  font-weight: bold;
  padding: 0.5rem;
  color: black;
  cursor: pointer;

  @media ${(props) => props.theme.breakpoints.TABLETMIN} {
    font-size: 1.1rem;
  }
`;
