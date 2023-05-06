import { user } from './mock';
import * as S from './UserDetailInfo.style';

const UserDetailInfo = () => {
  return (
    <div>
      <label>
        Intro
        <p>{user.intro}</p>
      </label>
      {user.company && (
        <label>
          <S.CompanyIcon />
          <p>: {user.company}</p>
        </label>
      )}
      {user.email && (
        <label>
          <S.EmailIcon />
          <p>: {user.email}</p>
        </label>
      )}
      {user.blog && (
        <label>
          <S.BlogIcon />
          <p>: {user.blog}</p>
        </label>
      )}
    </div>
  );
};

export default UserDetailInfo;
