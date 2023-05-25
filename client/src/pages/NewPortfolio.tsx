import PortfolioContainer from '../components/Portfolio/PortfolioContainer';
import * as S from './NewPortfolio.style';

import { getUserIdFromAccessToken } from '../utils/getUserIdFromAccessToken';
import { useGetUserProfile } from '../hooks/useGetUserProfile';

// redux
import store, { RootState } from '../store';
import Loading from '../components/common/Loading';
import { useSelector } from 'react-redux';

function NewPortfolio() {
  const isLogin = useSelector((state: RootState) => state.login.isLogin);
  const accessToken = localStorage.getItem('accessToken');

  // userId 받아오기
  const userId = getUserIdFromAccessToken(isLogin, accessToken);

  //  UserProfile 받아오기
  const { UserProfile, getUserProfileLoading } = useGetUserProfile(Number(userId));
  // if (UserProfile) console.log(UserProfile);

  return (
    <S.NewPortfolioContainer>
      {getUserProfileLoading && <Loading />}
      {UserProfile && <PortfolioContainer isEdit={false} UserProfile={UserProfile} />}
    </S.NewPortfolioContainer>
  );
}

export default NewPortfolio;
