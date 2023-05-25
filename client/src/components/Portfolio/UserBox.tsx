import React from 'react';
import * as S from '../Portfolio/UserBox.style';

type UserBoxProps = {
  name: string;
  profileImg: string;
};

const UserBox: React.FC<UserBoxProps> = ({ name, profileImg }) => {
  return (
    <S.UserBox>
      <S.UserImg>
        <img src={profileImg} />
      </S.UserImg>
      <span>{name}</span>
    </S.UserBox>
  );
};

export default UserBox;
