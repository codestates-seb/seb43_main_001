import React from 'react';
import * as S from '../Portfolio/UserBox.style';

type UserBoxProps = {
  email: string;
  profileImg: string;
};

const UserBox: React.FC<UserBoxProps> = ({ email, profileImg }) => {
  // const img =
  //   'https://images.unsplash.com/photo-1488161628813-04466f872be2?crop=entropy&cs=srgb&fm=jpg&ixid=Mnw3MjAxN3wwfDF8c2VhcmNofDl8fHBlb3BsZXxlbnwwfHx8fDE2ODMwODA2MDQ&ixlib=rb-4.0.3&q=85&q=85&fmt=jpg&crop=entropy&cs=tinysrgb&w=450';
  console.log(profileImg);
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
