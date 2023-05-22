import styled from 'styled-components';
import { COLOR } from '../../constants';

const { subFontColor } = COLOR;

export const TextareaContainer = styled.div`
  display: flex;
  flex-direction: column;

  margin-bottom: 15px;
`;
export const Title = styled.span`
  height: 45px;
`;

export const TextareaBox = styled.textarea`
  height: 80px;
  border-radius: 10px;
  border: none;

  box-shadow: 0 0.3rem 0.3rem 0
    ${(props) => (props.theme.value === 'light' ? subFontColor : 'none')};
  font-size: 0.8rem;
  background-color: ${(props) => props.theme.themeStyle.inputColor};
  padding: 0.5rem;
`;
export const caution = styled.span`
  color: red;
  font-size: 0.5rem;
  padding: 0.5rem;
  font-weight: 500;
  @media ${(props) => props.theme.breakpoints.TABLETMIN} {
    font-size: 0.7rem;
  }
  @media ${(props) => props.theme.breakpoints.DESKTOPMIN} {
    font-size: 0.9rem;
  }
`;
