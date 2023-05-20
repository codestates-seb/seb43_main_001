import { Github, Google } from '../common/icons';
import OAuthBtn from './OAuthBtn';
import * as S from './LoginContainer.style';
import { useSelector } from 'react-redux';

import { RootState } from '../../store';

import { LoginAPI } from '../../api/client';

function LoginContainer() {
  const isLogin = useSelector((state: RootState) => state.login.isLogin);
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
      <S.ProjectName>
        <Github />
        프로젝트 이름
      </S.ProjectName>
      <S.Title>포트폴리오 때문에 고민이신가요?</S.Title>
      <S.Detail>
        OOO으로 손쉽게 포트폴리오를 작성하고 <br /> 다른 사람들과 공유해보세요!
      </S.Detail>
      {!isLogin && (
        <>
          <OAuthBtn logo={<Github />} text={'Github Login'} onClick={GithubLoginHandler}></OAuthBtn>
          <OAuthBtn logo={<Google />} text={'Google Login'} onClick={GoogleLoginHandler}></OAuthBtn>
        </>
      )}
    </S.LoginLayout>
  );
}

export default LoginContainer;
