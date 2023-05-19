import styled from 'styled-components';
import { COLOR } from '../../constants/index';

const { mainColor } = COLOR;

export const NavDropDonwMenu = styled.nav`
  display: block;
  width: 100%;
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1;
  background-color: ${(props) => props.theme.themeStyle.backgroundColor};
  @media ${(props) => props.theme.breakpoints.TABLETMIN} {
    display: none;
  }
`;

export const LinkList = styled.ul`
  display: flex;
  flex-direction: column;
`;

export const Link = styled.div`
  width: 100%;
  text-align: center;
  padding: 2rem 0;
  font-size: 1.2rem;
  font-weight: 700;
  cursor: pointer;
  &:hover {
    background-color: ${mainColor};
  }
`;
