import React from 'react';
import * as S from '../Portfolio/UserBox.style';

type UserBoxProps = {
  email: string;
  profileImg: string;
};

const UserBox: React.FC<UserBoxProps> = ({ email, profileImg }) => {
  return (
    <S.UserBox>
      <S.UserImg>
        <img src={profileImg} />
      </S.UserImg>
      <span>{email}</span>
    </S.UserBox>
  );
};

export default UserBox;
