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
      <h1>Silmul</h1>
      <h2>
        실력을 물어보자! <br />
        개발자들의 포트폴리오 공유 플랫폼, 실물
      </h2>
      {/* <p>
        실물(Silmul)은 개발자들을 위한 소통하는 포트폴리오 공유 플랫폼입니다.
        <br /> 실물(Silmul)에서는 프로젝트, 기술 및 경험을 포함하여 포트폴리오에 대한 세부 정보를
        추가할 수 있습니다. <br />
        포트폴리오를 검색하고 다른 개발자의 작업을 확인해보세요!
      </p> */}
      <S.ShareButton onClick={handleClickButton}>프로젝트 공유하기</S.ShareButton>
    </S.Banner>
  );
}

export default Banner;
