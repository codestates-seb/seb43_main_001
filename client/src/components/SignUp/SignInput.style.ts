import styled from 'styled-components';

// constant
import { COLOR } from '../../constants';

const { subFontColor, mainColor } = COLOR;

export const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 10px;
`;

export const SignTitle = styled.div`
  font-weight: 500;
  font-size: 1.2rem;
`;

export const SignInput = styled.input`
  position: relative;
  width: 360px;
  height: 45px;
  border: 2px solid ${subFontColor};
  color: ${(props) => props.theme.themeStyle.fontColor};
  background-color: transparent;
  padding: 0.5rem;
  border-radius: 8px;
  outline: ${mainColor};
  &:focus {
    border-color: ${mainColor};
  }
`;
