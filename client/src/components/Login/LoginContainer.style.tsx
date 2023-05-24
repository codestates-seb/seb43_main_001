import styled from 'styled-components';
import { COLOR } from '../../constants';
import { lightTheme } from '../../style/theme';
import * as S from '../SignUp/SignupForm.style';

const { mainColor } = COLOR;
const { TABLETMIN, DESKTOPMIN } = lightTheme.breakpoints;

export const LoginLayout = styled.div`
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  /* width: 70%;
  margin: 0 auto; */

  .sns__title {
    margin-top: 1.5rem;
    font-size: 1.3rem;
    font-weight: bold;
  }
`;

export const LoginForm = styled(S.SignUpForm)``;

export const Title = styled(S.Title)``;

export const ErrorMessage = styled(S.ErrorMessage)``;

export const LoginButton = styled(S.SignUpButton)``;

export const NewAccount = styled(S.AlreadySignUp)``;

export const SnsLogin = styled.div`
  display: flex;
  gap: 2rem;
  margin-top: 1rem;
`;
