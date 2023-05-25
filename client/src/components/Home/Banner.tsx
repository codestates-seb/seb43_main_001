import { useAppSelector } from '../../hooks/reduxHook';
import { useRouter } from '../../hooks/useRouter';
import * as S from './Banner.style';

function Banner() {
  const { routeTo } = useRouter();
  const isLogin = useAppSelector((state) => state.login.isLogin);

  const handleClickButton = () => {
    if (isLogin) {
      routeTo('/NewPortfolio');
    } else {
      routeTo('/Login');
    }
  };

  return (
    <S.Banner>
      <S.BannerContent>
        <h1>Silmul</h1>
        <h2>
          실력을 물어보자! <br />
          개발자들의 포트폴리오 공유 플랫폼, 실물
        </h2>
        <S.ShareButton onClick={handleClickButton}>프로젝트 공유하기</S.ShareButton>
      </S.BannerContent>
      <S.BannerImg>
        <img src='./assets/image/meeting.svg' alt='배경 일러스트' />
      </S.BannerImg>
    </S.Banner>
  );
}

export default Banner;
