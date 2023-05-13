import { useSelector } from 'react-redux';
import { useRouter } from '../../hooks/useRouter';
import * as S from './Banner.style';

// * type
// ? 공용 타입으로 옮기기..?
type LoginState = {
  login: { isLogin: boolean };
};

function Banner() {
  const { routeTo } = useRouter();
  const isLogin = useSelector((state: LoginState) => state.login.isLogin);

  const handleClickButton = () => {
    if (isLogin) {
      routeTo('/newPortfolio');
    } else {
      routeTo('/Login');
    }
  };

  return (
    <S.Banner>
      <h1>이름</h1>
      <p>설명입니다설명입니다설명입니다설명입니다</p>
      <S.ShareButton onClick={handleClickButton}>공유하기</S.ShareButton>
    </S.Banner>
  );
}

export default Banner;
