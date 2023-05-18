import PortfolioContainer from '../components/Portfolio/PortfolioContainer';
import * as S from './NewPortfolio.style';

import { getUserIdFromAccessToken } from '../utils/getUserIdFromAccessToken';
import { useGetUserProfile } from '../hooks/useGetUserProfile';

// redux
import { loginState, access } from '../store/slice/loginSlice';
import store from '../store';
import Loading from '../components/common/Loading';

function NewPortfolio() {
  const isLogin = loginState(store.getState());
  const accessToken = localStorage.getItem('accessToken');
  // const accessToken = access(store.getState());

  // userId 받아오기
  const userId = getUserIdFromAccessToken(isLogin, accessToken);

  // UserInfo 받아오기
  const { UserInfo, getUserInfoLoading } = useGetUserProfile(Number(userId));

  return (
    <S.NewPortfolioContainer>
      {getUserInfoLoading && <Loading />}
      {UserInfo && <PortfolioContainer isEdit={false} UserInfo={UserInfo} />}
    </S.NewPortfolioContainer>
  );
}

export default NewPortfolio;
