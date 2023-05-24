import { useState } from 'react';
import { useRouter } from '../../hooks/useRouter';
import * as S from './Footer.style';
import HelpModal from './HelpModal';
import { Logo } from '../../components/common/icons';

function Footer() {
  const { routeTo } = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  const handleModal = () => {
    setIsVisible(!isVisible);
  };

  const handleClick = () => {
    routeTo('/About');
  };

  return (
    <>
      <HelpModal isVisible={isVisible} />
      <S.FooterWrapper>
        <S.Logo>
          <Logo />
        </S.Logo>
        <S.Info>
          <span onClick={handleModal}>문의하기</span>
          <span onClick={handleClick}>서비스 소개</span>
          <a
            href='https://github.com/codestates-seb/seb43_main_001'
            target='_blank'
            rel='noreferrer'
          >
            <S.GithubLogo />
          </a>
        </S.Info>
      </S.FooterWrapper>
    </>
  );
}

export default Footer;
