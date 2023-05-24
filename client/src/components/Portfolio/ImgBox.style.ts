import styled from 'styled-components';
import * as S from './TextBox.style';
import { COLOR, MAX_SIZE } from '../../constants';
import { SubmitBtn } from './PortfolioContainer.style';

const { mainColor, subFontColor } = COLOR;

const { content } = MAX_SIZE;

export const ImgContainer = styled(S.TextContainer)`
  .title_container {
    display: flex;
    justify-content: space-between;
  }
  .button_container {
    display: flex;
  }
  .preview {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;

    background-color: ${(props) => props.theme.themeStyle.inputColor};

    border-radius: 10px;
    border: none;
    box-shadow: 0 0.3rem 0.3rem 0
      ${(props) => (props.theme.value === 'light' ? subFontColor : 'none')};
    padding: 0.5rem;
  }
  img {
    justify-content: center;
    max-width: 100%;
  }
  .file {
    display: none;
  }
`;

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

export const Preview = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 0.7rem;

  background-color: ${(props) => props.theme.themeStyle.inputColor};

  border-radius: 10px;
  border: none;
  box-shadow: 0 0.3rem 0.3rem 0
    ${(props) => (props.theme.value === 'light' ? subFontColor : 'none')};
  padding: 0.5rem;
`;

export const ImgName = styled.span``;

export const ImgInput = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.8rem;
  font-weight: 500;
  color: black;
  background-color: ${mainColor};
  border-radius: 10px;
  padding: 1rem 0.6rem;
  height: 30px;
  margin-right: 0.5rem;
  @media ${(props) => props.theme.breakpoints.TABLETMIN} {
    font-size: 1rem;
    padding: 1.2rem 0.8rem;
    height: 40px;
  }

  @media ${(props) => props.theme.breakpoints.DESKTOPMIN} {
    max-width: ${content};
    padding: 1.4rem 1rem;
    font-size: 1.2rem;
  }
`;
export const RemoveBtn = styled(SubmitBtn)`
  background-color: red;
  color: white;
`;
