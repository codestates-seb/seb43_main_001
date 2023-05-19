import Portfolio from '../components/User/Portfolio';
import * as S from './User.style';
import UserInfo from '../components/User/UserInfo';
import { useParams } from 'react-router-dom';

function User() {
  // TODO : 해당 유저 데이터의 id값으로 정보, 포트폴리오, 코멘트 모두 가져오기
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
