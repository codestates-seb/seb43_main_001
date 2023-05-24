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
import { useRouter } from '../hooks/useRouter';

function EditPortfolio() {
  const { portfolioId } = useParams();
  const { routeTo } = useRouter();

  const isLogin = useSelector((state: RootState) => state.login.isLogin);
  const accessToken = localStorage.getItem('accessToken');

  // PortfolioInfo 받아오기
  const { PortfolioInfo, getPortfolioLoading } = useGetPortfolio(Number(portfolioId));

  // 사용자의 포트폴리오가 아닐 경우 메인으로 이동
  if (!PortfolioInfo?.auth) {
    routeTo('/');
  }
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
