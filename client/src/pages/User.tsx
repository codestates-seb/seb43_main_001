import Portfolio from '../components/User/Portfolio';
import * as S from './User.style';
import UserInfo from '../components/User/UserInfo';

function User() {
  return (
    <S.User>
      <UserInfo />
      <S.WebPortfolioContainer>
        <Portfolio />
      </S.WebPortfolioContainer>
    </S.User>
  );
}

export default User;
