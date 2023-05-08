import React from 'react';
import { Github, Google } from '../common/icons';
import OAuthBtn from './OAuthBtn';
import * as S from './LoginContainer.style';

function LoginContainer() {
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
      <OAuthBtn logo={<Github />} text={'Github Login'}></OAuthBtn>
      {/* <OauthBtn logo={<Google />} text={'Google Login'}></OauthBtn> */}
    </S.LoginLayout>
  );
}

export default LoginContainer;
