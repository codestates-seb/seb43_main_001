import * as S from './Footer.style';

function Footer() {
  return (
    <S.FooterWrapper>
      <S.Logo>Logo</S.Logo>
      <S.Info>
        <span>서비스 소개</span>
        <span>문의하기</span>
        <a href='https://github.com/codestates-seb/seb43_main_001' target='_blank' rel='noreferrer'>
          <S.GithubLogo />
        </a>
      </S.Info>
    </S.FooterWrapper>
  );
}

export default Footer;
