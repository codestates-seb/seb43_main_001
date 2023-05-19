import axios from 'axios';
import React from 'react';
import TextBox from '../components/Portfolio/TextBox';
import useInput from '../hooks/useInput';
import * as S from './AddEmail.style';

function AddEmail() {
  const email = useInput('');

  const postEmail = async () => {
    // 이메일
    const res = await axios.patch(
      'http://ec2-43-201-157-191.ap-northeast-2.compute.amazonaws.com:8080/addemail?userId=1',
      {
        email: email.value,
      },
    );

    window.location.assign(
      'http://ec2-43-201-157-191.ap-northeast-2.compute.amazonaws.com:8080/oauth2/authorization/github',
    );

    console.log(res);
  };

  return (
    <S.AddEmailContainer>
      <S.AddEmailLayout>
        <S.PageTitle>추가적으로 이메일을 등록해주세요</S.PageTitle>
        <TextBox text={'이메일'} {...email} />
        <S.ButtonContainer>
          <S.caution>*작성 완료 후 이메일은 수정이 불가합니다</S.caution>
          <S.SubmitBtn onClick={postEmail}>작성 완료</S.SubmitBtn>
        </S.ButtonContainer>
      </S.AddEmailLayout>
    </S.AddEmailContainer>
  );
}

export default AddEmail;
