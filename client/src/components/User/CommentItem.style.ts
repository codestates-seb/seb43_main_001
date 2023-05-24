import styled from 'styled-components';
import { RxCross2, RxPencil2, RxCheck, RxDoubleArrowRight, RxLockClosed } from 'react-icons/rx';
import { COLOR } from '../../constants/index';
const { subFontColor } = COLOR;

export const CommentItem = styled.li`
  padding: 10px;
  padding-bottom: 40px;
  margin: 10px 0;
  border-radius: 10px;
  /* box-shadow: 0px 2px 2px ${subFontColor}; */
  box-shadow: 0 0.3rem 0.3rem 0
    ${(props) => (props.theme.value === 'light' ? subFontColor : 'none')};
  position: relative;
  background-color: ${({ theme }) => theme.themeStyle.cardColor};
  svg {
    font-size: 1.3rem;
    &:hover {
      color: ${subFontColor};
    }
  }
  textarea {
    width: 100%;
    border-radius: 10px;
    height: 2rem;
    outline: none;
    background-color: ${({ theme }) => theme.themeStyle.cardColor};
    color: ${(props) => props.theme.themeStyle.fontColor};
    resize: none;
  }
  button {
    &:hover {
      color: ${subFontColor};
    }
  }
`;
export const TextBox = styled.p`
  width: 100%;
  margin: 8px 0;
  overflow-wrap: break-word;
`;
export const ImgBox = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 5px;
  img {
    width: 20px;
    height: 20px;
  }
`;
export const CommentUser = styled.div`
  display: flex;
  position: absolute;
  bottom: 10px;
  right: 10px;
  height: 20px;
  align-items: center;
  font-size: 0.8rem;
`;

export const DelBtn = styled(RxCross2)`
  cursor: pointer;
  &:hover {
    color: red;
  }
`;
export const EditBtn = styled(RxPencil2)`
  cursor: pointer;
`;
export const SubmitBtn = styled(RxCheck)`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;
export const LinkIcon = styled(RxDoubleArrowRight)`
  position: absolute;
  bottom: 30px;
  right: 10px;
  color: ${subFontColor};
  cursor: pointer;
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
export const SecretText = styled.p`
  text-align: center;
  margin-top: 20px;
`;
export const SecretIcon = styled(RxLockClosed)`
  color: ${subFontColor};
  cursor: auto;
`;
