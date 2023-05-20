import { useParams } from 'react-router-dom';
import Loading from '../components/common/Loading';
import PortfolioContainer from '../components/Portfolio/PortfolioContainer';
import { useGetPortfolio } from '../hooks/useGetPortfolio';
import * as S from './EditPortfolio.style';

import { getUserIdFromAccessToken } from '../utils/getUserIdFromAccessToken';
import { useGetUserProfile } from '../hooks/useGetUserProfile';

// redux
import store, { RootState } from '../store';
import { useSelector } from 'react-redux';

function EditPortfolio() {
  const { portfolioId } = useParams();

  // PortfolioInfo 받아오기
  const { PortfolioInfo, getPortfolioLoading } = useGetPortfolio(Number(portfolioId));

  const isLogin = useSelector((state: RootState) => state.login.isLogin);
  const accessToken = localStorage.getItem('accessToken');

  // userId 받아오기
  const userId = getUserIdFromAccessToken(isLogin, accessToken);

  // UserInfo 받아오기
  const { UserProfile, getUserProfileLoading } = useGetUserProfile(Number(userId));

  return (
    <S.EditPortfolioContainer>
      {(getPortfolioLoading || getUserProfileLoading) && <Loading />}
      {PortfolioInfo && UserProfile && (
        <PortfolioContainer isEdit={true} PortfolioInfo={PortfolioInfo} UserProfile={UserProfile} />
      )}
    </S.EditPortfolioContainer>
  );
}

export default EditPortfolio;
