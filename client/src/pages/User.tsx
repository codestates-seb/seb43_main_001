import Portfolio from '../components/User/Portfolio';
import * as S from './User.style';
import UserInfo from '../components/User/UserInfo';
import { useParams } from 'react-router-dom';

function User() {
  const { userId } = useParams() as { userId: string };

  return (
    <S.User>
      <UserInfo userId={Number(userId)} />
      <S.WebPortfolioContainer>
        <Portfolio userId={Number(userId)} />
      </S.WebPortfolioContainer>
    </S.User>
  );
}

export default User;
