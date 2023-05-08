import styled from 'styled-components';
import { COLOR } from '../../constants/index';
import { RxGithubLogo } from 'react-icons/rx';

export const FooterWrapper = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 9px 20px;
  border-top: 1px solid
    ${(props) => (props.theme.value === 'light' ? COLOR.divider : 'rgba(243, 243, 243, 0.5)')};
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  color: ${(props) => props.theme.themeStyle.fontColor};
  background-color: ${(props) => props.theme.themeStyle.backgroundColor};
  z-index: 100;
`;

export const Logo = styled.strong`
  font-size: 13px;
  font-weight: 700;
`;

export const Info = styled.div`
  display: flex;
  gap: 12px;

  span {
    font-size: 13px;
    cursor: pointer;
  }

  a {
    position: relative;
    width: 20px;
    height: 20px;
  }

  a::before {
    content: '개발팀 Github';
    display: none;
    width: 75px;
    padding: 2px 3px;
    border: 1px solid
      ${(props) => (props.theme.value === 'light' ? COLOR.divider : 'rgba(243, 243, 243, 0.5)')};
    border-radius: 3px;
    position: absolute;
    top: -28px;
    right: 0;
    color: ${(props) => props.theme.themeStyle.fontColor};
    background-color: ${(props) => props.theme.themeStyle.backgroundColor};
    font-size: 12px;
    text-align: center;
  }

  a:hover::before {
    display: block;
  }
`;

export const GithubLogo = styled(RxGithubLogo)`
  font-size: 20px;
  color: ${(props) => props.theme.themeStyle.fontColor};
`;
