import styled, { css } from 'styled-components';
import { COLOR } from '../../constants';

// icons
import { RxCross2, RxPencil2, RxCheck } from 'react-icons/rx';

const { subFontColor } = COLOR;

export const Container = styled.section`
  position: relative;
  padding: 1rem;
  border: 10;
  border-radius: 5px;
  box-shadow: 0px 2px 2px ${subFontColor};
`;

export const Update = styled.div`
  display: flex;
`;

export const Content = styled.div`
  padding: 1.2rem;
  font-weight: 700;
`;

export const CreateAt = styled.div`
  display: flex;
  justify-content: flex-end;
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
  font-size: 1.3rem;
`;

export const DelBtn = styled(RxCross2)`
  margin-right: 0.8rem;
  ${CommonIconStyle}
`;
export const EditBtn = styled(RxPencil2)`
  ${CommonIconStyle}
`;
export const ComfirmBtn = styled(RxCheck)`
  ${CommonIconStyle}
  position: absolute;
  top: 10px;
  right: 10px;
`;
