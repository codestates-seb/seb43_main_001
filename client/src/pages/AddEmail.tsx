import React from 'react';
import { postEmail } from '../api/client';

import TextBox from '../components/Portfolio/TextBox';
import useInput from '../hooks/useInput';
import * as S from './AddEmail.style';

const AddEmail: React.FC = () => {
  const urlSearch = new URLSearchParams(location.search);
  const userId = urlSearch.get('userId');

  const email = useInput('');

  const handlePostEmail = async () => {
    // 이메일

    if (!userId) {
      alert('userId가 올바르지 않습니다');
      return;
    }
    const res = await postEmail(email.value, userId);
  };

  return (
    <S.AddEmailContainer>
      <S.AddEmailLayout>
        <S.PageTitle>추가적으로 이메일을 등록해주세요</S.PageTitle>
        <TextBox text={'이메일'} {...email} />
        <S.ButtonContainer>
          <S.caution>*작성 완료 후 이메일은 수정이 불가합니다</S.caution>
          <S.SubmitBtn onClick={handlePostEmail}>작성 완료</S.SubmitBtn>
        </S.ButtonContainer>
      </S.AddEmailLayout>
    </S.AddEmailContainer>
  );
};

export default AddEmail;
