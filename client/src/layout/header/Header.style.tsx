import styled from 'styled-components';

export const Header = styled.nav`
  width: 100%;
  height: 65px;
  border-bottom: 1px solid rgb(243, 243, 243, 0.5);
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  z-index: 1;
  background-color: ${(props) => props.theme.themeStyle.backgroundColor};
`;

export const UserImg = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 1.2rem;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  .header-login,
  .header-signup {
    display: none;
  }

  @media ${(props) => props.theme.breakpoints.TABLETMIN} {
    .header-login,
    .header-signup {
      display: inline-block;
    }
  }
`;

export const Logo = styled.div`
  width: 30%;
  font-size: 2rem;
  font-weight: 900;
  cursor: pointer;
`;

export const SignUp = styled.span`
  padding: 0 1.2rem;
  cursor: pointer;
`;
