import styled from 'styled-components';
import { COLOR } from '../../constants/index';
const { subFontColor, mainColor } = COLOR;

export const FeedbackContainer = styled.div`
  padding: 10px;
  border-top: 1px double black;
`;
export const Feedback = styled.div`
  padding: 10px;
  padding-bottom: 40px;
  margin: 10px 0;
  border-radius: 10px;
  box-shadow: 0px 2px 2px ${subFontColor};
  position: relative;
  background-color: ${({ theme }) => theme.themeStyle.cardColor};
`;
export const ImgBox = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 5px;
  img {
    width: 20px;
    height: 20px;
  }
`;
export const Feedbacks = styled.div`
  height: 300px;
  overflow: scroll;
`;
export const FeedbackUser = styled.div`
  display: flex;
  position: absolute;
  bottom: 10px;
  right: 10px;
  height: 20px;
  align-items: center;
  font-size: 0.8rem;
`;
export const FeedbackAdd = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  label {
    margin: 10px;
  }
  input {
    height: 50px;
    padding: 10px;
    border-radius: 10px;
    border: 0;
    box-shadow: 0px 2px 2px ${subFontColor};
    position: relative;
    z-index: 50;
    outline: none;
    background-color: ${({ theme }) => theme.themeStyle.cardColor};
    color: ${(props) => props.theme.themeStyle.fontColor};
  }
  button {
    width: 100%;
    background-color: ${mainColor};
    border-radius: 0 0 10px 10px;
    padding: 10px;
    text-align: right;
    position: relative;
    bottom: 20px;
    z-index: 0;
    box-shadow: 0px 2px 2px ${subFontColor};
  }
`;
