import styled from 'styled-components';

export const Header = styled.section`
  width: 100%;
  height: 65px;
  border-bottom: 3px solid rgb(243, 243, 243, 0.6);
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  button {
    display: none;
  }
  @media ${(props) => props.theme.breakpoints.TABLETMIN} {
    button {
      display: inline-block;
    }
  }
`;

export const Logo = styled.div`
  width: 30%;
  font-size: 2rem;
  cursor: pointer;
`;
