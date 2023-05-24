import styled, { css } from 'styled-components';
import { COLOR } from '../../constants';

// icons
import { RxCross2, RxPencil2, RxCheck } from 'react-icons/rx';

const { subFontColor } = COLOR;

export const Container = styled.section`
  position: relative;
  padding: 1rem;
  border-radius: 5px;
  box-shadow: 0 0.3rem 0.3rem 0
    ${(props) => (props.theme.value === 'light' ? subFontColor : 'white')};
  background-color: ${({ theme }) => theme.themeStyle.cardColor};
`;

export const Update = styled.div`
  display: flex;
`;

export const DelText = styled.p`
  margin: 20px 0;
  text-align: center;
`;

export const SelectBtns = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  button {
    color: ${(props) => props.theme.themeStyle.fontColor};
    margin: 0 10px;
    font-size: 0.9rem;
  }
  button:first-child {
    &:hover {
      color: red;
    }
  }
`;

export const Content = styled.div`
  padding: 1.2rem;
  font-weight: 500;
`;

export const CreateAt = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  .comment-userImg {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin: 0 8px;
  }
`;

export const EditArea = styled.textarea`
  width: 100%;
  height: 100px;
  border-radius: 4px;
  padding: 0.5rem;
  background-color: transparent;
  border: 2px solid ${(props) => props.theme.themeStyle.inputBorderColor};
  color: ${(props) => props.theme.themeStyle.fontColor};
  resize: none;
`;

const CommonIconStyle = css`
  font-size: 1.5rem;
`;

export const DelBtn = styled(RxCross2)`
  margin-right: 0.8rem;
  ${CommonIconStyle}
  &:hover {
    color: red;
  }
`;
export const EditBtn = styled(RxPencil2)`
  ${CommonIconStyle}
  &:hover {
    color: ${subFontColor};
  }
`;
export const ConfirmBtnCircle = styled.div`
  border: 1px solid black;
  border-radius: 50%;
  position: absolute;
  top: 13px;
  right: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    border-color: ${subFontColor};
    .confirm-icon {
      color: ${subFontColor};
    }
  }
`;
export const ConfirmBtn = styled(RxCheck)`
  ${CommonIconStyle}
`;
