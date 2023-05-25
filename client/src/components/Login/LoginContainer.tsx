import { RxGithubLogo } from 'react-icons/rx';
import { FcGoogle } from 'react-icons/fc';

import OAuthBtn from './OAuthBtn';
import SignInput from '../SignUp/SignInput';
import * as S from './LoginContainer.style';

import { useSelector } from 'react-redux';
import { RootState } from '../../store';

import { LoginAPI } from '../../api/client';

import { useState } from 'react';
import { useRouter } from '../../hooks/useRouter';
import { usePostUserLogin } from '../../hooks/usePostUserLogin';

import { Login } from '../../types';

function LoginContainer() {
  const isLogin = useSelector((state: RootState) => state.login.isLogin);

  const [userEmail, setUserEmail] = useState<string>('');
  const [userPassword, setUserPassword] = useState<string>('');

  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);

  const { routeTo } = useRouter();

  const { postUserInfoLogin } = usePostUserLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userEmail === '') setEmailError(true);
    else setEmailError(false);
    if (userPassword.length < 8) return setPasswordError(true);
    else setPasswordError(false);
    postUserInfoLogin({ username: userEmail, password: userPassword });
    // postUserInfoSignUp({ name: userName, password: userPassword, email: userEmail });
  };

  const GithubLoginHandler = () => {
    // 로그인 시도
    LoginAPI.githubLogin();
  };

  const GoogleLoginHandler = () => {
    // 로그인 시도
    LoginAPI.googleLogin();
  };

  return (
    <S.LoginLayout>
      <S.LoginForm onSubmit={handleSubmit}>
        <S.Title>로그인</S.Title>
        <SignInput
          type={'email'}
          name={'이메일'}
          placeholder={'이메일을 입력하세요'}
          value={userEmail}
          setValue={setUserEmail}
        />
        {emailError ? <S.ErrorMessage>빈 문자는 제출할 수 없습니다</S.ErrorMessage> : null}
        <SignInput
          type={'password'}
          name={'비밀번호'}
          placeholder={'비밀번호를 입력하세요(8자 이상)'}
          value={userPassword}
          setValue={setUserPassword}
        />
        {passwordError ? <S.ErrorMessage>8자 이상 입력하셔야 합니다</S.ErrorMessage> : null}
        <S.LoginButton type='submit'>로그인</S.LoginButton>
        <S.NewAccount>
          계정이 없으신가요? <strong onClick={() => routeTo('/Signup')}>회원가입</strong>
        </S.NewAccount>
        <hr />
        <span className='sns__title'>SNS 로그인</span>
        <S.SnsLogin>
          <OAuthBtn
            logo={<RxGithubLogo />}
            onClick={(e) => {
              e.preventDefault();
              GithubLoginHandler();
            }}
          ></OAuthBtn>
          <OAuthBtn
            logo={<FcGoogle />}
            onClick={(e) => {
              e.preventDefault();
              GoogleLoginHandler();
            }}
          ></OAuthBtn>
        </S.SnsLogin>
      </S.LoginForm>
    </S.LoginLayout>
  );
}

export default LoginContainer;
