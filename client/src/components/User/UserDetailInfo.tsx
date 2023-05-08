import { user } from './mock';
import * as S from './UserDetailInfo.style';

const UserDetailInfo = () => {
  return (
    <S.DetailInfo>
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
          <a href={user.blog} target='_blank' rel='noreferrer'>
            : {user.blog}
          </a>
        </label>
      )}
    </S.DetailInfo>
  );
};

export default UserDetailInfo;
