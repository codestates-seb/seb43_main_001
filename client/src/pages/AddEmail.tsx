import React from 'react';
import TextBox from '../components/Portfolio/TextBox';
import * as S from './AddEmail.style';

function AddEmail() {
  return (
    <S.AddEmailContainer>
      <S.AddEmailLayout>
        <S.PageTitle>추가적으로 이메일을 등록해주세요</S.PageTitle>
        <TextBox text={'이메일'} />
        <S.ButtonContainer>
          <S.SubmitBtn>작성 완료</S.SubmitBtn>
        </S.ButtonContainer>
      </S.AddEmailLayout>
    </S.AddEmailContainer>
  );
}

export default AddEmail;
