import styled from 'styled-components';

// icons
import { RxHamburgerMenu, RxCross1 } from 'react-icons/rx';

export const Hamburger = styled.div`
  cursor: pointer;
  width: 32px;
  height: 32px;
  @media ${(props) => props.theme.breakpoints.TABLETMIN} {
    display: none;
  }
`;

export const Menu = styled(RxHamburgerMenu)`
  font-size: 2rem;
`;
export const Cancel = styled(RxCross1)`
  font-size: 2rem;
`;
