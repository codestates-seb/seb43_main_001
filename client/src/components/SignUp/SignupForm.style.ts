import styled from 'styled-components';

// constant
import { COLOR } from '../../constants';

const { mainColor } = COLOR;

export const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
  gap: 10px;
  margin: 0 auto;
  @media ${(props) => props.theme.breakpoints.TABLETMIN} {
    width: 550px;
  }
`;
export const Title = styled.div`
  text-align: start;
  font-size: 3rem;
  font-weight: bold;
`;

export const SignUpButton = styled.button`
  width: 360px;
  height: 45px;
  background-color: ${mainColor};
  font-size: 1.2rem;
  font-weight: 500;
  border-radius: 8px;
`;

export const AlreadySignUp = styled.p`
  & strong {
    cursor: pointer;
  }
`;
export const ErrorMessage = styled.p`
  color: red;
  width: 360px;
  text-align: start;
`;
