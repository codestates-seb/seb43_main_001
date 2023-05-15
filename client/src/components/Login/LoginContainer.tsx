import { Github, Google } from '../common/icons';
import OAuthBtn from './OAuthBtn';
import * as S from './LoginContainer.style';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/slice/loginSlice';
import { RootState } from '../../store';

function LoginContainer() {
  const dispatch = useDispatch();
  const isLogin = useSelector((state: RootState) => state.login.isLogin);

  const GithubLoginHandler = () => {
    // 로그인 시도
    window.location.assign(
      'http://ec2-43-201-157-191.ap-northeast-2.compute.amazonaws.com:8080/oauth2/authorization/github',
    );
  };

  const GoogleLoginHandler = () => {
    // 로그인 시도
    window.location.assign(
      'http://ec2-43-201-157-191.ap-northeast-2.compute.amazonaws.com:8080/login/oauth2/code/%7BregistrationId%7D',
    );
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
          <OAuthBtn logo={<Google />} text={'Google Login'} onClick={GithubLoginHandler}></OAuthBtn>
          {/* <OauthBtn logo={<Google />} text={'Google Login'}></OauthBtn> */}
        </>
      )}

      {
        //  로그아웃 예시
        /* <button onClick={() => dispatch(logout(null))}>로그아웃</button> */
      }
    </S.LoginLayout>
  );
}

export default LoginContainer;
