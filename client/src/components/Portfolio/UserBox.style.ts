import styled from 'styled-components';
import { COLOR } from '../../constants';
import * as S from '../User/UserBasicInfo.style';
const { subFontColor } = COLOR;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`;
export const Title = styled.span`
  height: 45px;
`;
export const InputBox = styled.input`
  height: 60px;
  border-radius: 10px;
  border: none;
  box-shadow: 0 0.3rem 0.3rem 0
    ${(props) => (props.theme.value === 'light' ? subFontColor : 'none')};
  font-size: 0.8rem;
  background-color: ${(props) => props.theme.themeStyle.inputColor};
  padding: 0.5rem;
`;

export const UserBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

export const UserImg = styled(S.UserImg)`
  width: 80px;
  height: 80px;
`;

export const UserName = styled(S.UserName)``;
