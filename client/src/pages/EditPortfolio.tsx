import { useParams } from 'react-router-dom';
import Loading from '../components/common/Loading';
import PortfolioContainer from '../components/Portfolio/PortfolioContainer';
import { useGetPortfolio } from '../hooks/useGetPortfolio';
import * as S from './EditPortfolio.style';

import { getUserIdFromAccessToken } from '../utils/getUserIdFromAccessToken';
import { useGetUserProfile } from '../hooks/useGetUserProfile';

// redux
import { loginState, access } from '../store/slice/loginSlice';
import store from '../store';

function EditPortfolio() {
  const { portfolioId } = useParams();

  // PortfolioInfo 받아오기
  const { PortfolioInfo, getPortfolioLoading } = useGetPortfolio(Number(portfolioId));

  const isLogin = loginState(store.getState());
  const accessToken = localStorage.getItem('accessToken');
  // const accessToken = access(store.getState());

  // userId 받아오기
  const userId = getUserIdFromAccessToken(isLogin, accessToken);

  // UserInfo 받아오기
  const { UserInfo, getUserInfoLoading } = useGetUserProfile(Number(userId));

  return (
    <S.EditPortfolioContainer>
      {(getPortfolioLoading || getUserInfoLoading) && <Loading />}
      {PortfolioInfo && UserInfo && (
        <PortfolioContainer isEdit={true} PortfolioInfo={PortfolioInfo} UserInfo={UserInfo} />
      )}
    </S.EditPortfolioContainer>
  );
}

export default EditPortfolio;
