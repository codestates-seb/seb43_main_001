import styled from 'styled-components';
import { COLOR } from '../../constants';

// styled component
import * as S from '../common/Button.style';
const { subFontColor } = COLOR;

export const Container = styled.section`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CommentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CommentShow = styled.div`
  /* flex: 0 1 550px; */
  width: 100%;
  border: none;
  display: flex;
  flex-direction: column;
  gap: 15px;
  /* box-shadow: 0px 2px 2px ${subFontColor}; */
  /* overflow-y: auto;
  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.themeStyle.fontColor};
  } */
`;

export const CommentForm = styled.form`
  width: 100%;
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CommentArea = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 10px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.themeStyle.cardColor};
  box-shadow: 0 0.3rem 0.3rem 0
    ${(props) => (props.theme.value === 'light' ? subFontColor : 'white')};
  color: ${(props) => props.theme.themeStyle.fontColor};
  resize: none;
  margin-right: 0.5rem;
  &:focus {
    outline: none;
  }
`;

export const YellowBtnCustom = styled(S.YellowBtn)`
  font-size: 0.8rem;
  height: 100px;
  box-shadow: 0 0.3rem 0.3rem 0
    ${(props) => (props.theme.value === 'light' ? subFontColor : 'white')};

  box-shadow: 0 0.3rem 0.3rem 0
    ${(props) => (props.theme.value === 'light' ? subFontColor : 'none')};

  @media ${(props) => props.theme.breakpoints.TABLETMIN} {
    font-size: 1rem;
  }
`;
