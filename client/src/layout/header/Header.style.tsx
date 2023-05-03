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
`;

export const ButtonContainer = styled.div`
  display: flex;
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
`;
