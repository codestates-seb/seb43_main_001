import styled from 'styled-components';
import { COLOR } from '../../constants/index';
const { subFontColor, mainColor } = COLOR;

export const FeedbackContainer = styled.div`
  padding: 10px;
  border-top: 1px double black;
`;
export const Feedbacks = styled.ul`
  height: 300px;
  overflow: scroll;
  -ms-overflow-style: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;
export const FeedbackAdd = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  label {
    margin: 10px;
  }
  textarea {
    height: 80px;
    padding: 10px;
    border-radius: 10px;
    border: 0;
    box-shadow: 0px 2px 2px ${subFontColor};
    position: relative;
    z-index: 5;
    outline: none;
    background-color: ${({ theme }) => theme.themeStyle.cardColor};
    color: ${(props) => props.theme.themeStyle.fontColor};
    resize: none;
  }
  button {
    width: 100%;
    background-color: ${mainColor};
    border-radius: 0 0 10px 10px;
    padding: 10px 20px;
    text-align: right;
    position: relative;
    bottom: 15px;
    z-index: 0;
    font-size: 1rem;
    box-shadow: 0px 2px 2px ${subFontColor};
  }
`;
export const Secret = styled.label`
  position: absolute;
  font-size: 1rem;
  display: flex;
  align-items: center;
  bottom: 23px;
  left: 10px;
  z-index: 10;
  color: black;
  input[type='checkbox'] {
    appearance: none;
    cursor: pointer;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 5px;
    margin-left: 5px;
    border: 1px solid ${mainColor};
    background-color: white;
    transition: all 0.5s;
  }
  input:checked {
    border: 2px solid white;
    background-color: ${mainColor};
    transition: all 0.3s;
  }
`;
