import styled from 'styled-components';
import { COLOR } from '../../constants/index';

export const Container = styled.div`
  position: fixed;
  bottom: 48px;
  right: 62px;
  padding: 10px 15px;
  border: 1px solid
    ${(props) => (props.theme.value === 'light' ? COLOR.divider : 'rgba(243, 243, 243, 0.5)')};
  border-radius: 3px;
  background-color: ${({ theme }) => theme.themeStyle.backgroundColor};
  text-align: center;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 10px 30px -20px;
  transform: scale(0);
  opacity: 0;
  transition: all 300ms;

  &.visible {
    transform: scale(1);
    opacity: 1;
  }
`;

export const Title = styled.h1`
  margin-bottom: 5px;
  color: ${(props) => props.theme.themeStyle.fontColor};
  font-size: 15px;
  font-weight: 700;
`;

export const Description = styled.p`
  margin-bottom: 5px;
  color: ${COLOR.subFontColor};
  font-size: 12px;
`;

export const Email = styled.a`
  color: ${(props) => props.theme.themeStyle.fontColor};
  font-size: 12px;
  font-weight: 500;
  text-decoration: underline;
`;
