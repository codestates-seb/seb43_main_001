import React, { useEffect, useState } from 'react';
import { postEmail } from '../api/client';
import { toast } from 'react-toastify';

import TextBox from '../components/Portfolio/TextBox';
import * as S from './AddEmail.style';

import useInput from '../hooks/useInput';
import { useRouter } from '../hooks/useRouter';
import { usePostCheckEmail } from '../hooks/usePostCheckEmail';
import { useGetUserProfile } from '../hooks/useGetUserProfile';

import Loading from '../components/common/Loading';

const AddEmail: React.FC = () => {
  const urlSearch = new URLSearchParams(location.search);
  const userId = urlSearch.get('userId');
  const { routeTo } = useRouter();
  const email = useInput('');

  const [isEmailDupulicateChecked, setEmailDuplicateChecked] = useState<boolean>(false);

  //  UserProfile 받아오기
  const { UserProfile, getUserProfileError, getUserProfileLoading } = useGetUserProfile(
    Number(userId),
  );
  const { handleCheckEmail } = usePostCheckEmail();

  // 중복 체크 버튼
  const handleCheckDuplicateEmailClick = () => {
    const regex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');
    if (regex.test(email.value)) {
      handleCheckEmail(email.value);
      setEmailDuplicateChecked(true);
    } else {
      toast.error('이메일 형식을 지켜 입력해주세요');
    }
  };

  // 이메일 추가 함수
  const handlePostEmail = async () => {
    // 이메일
    if (userId) {
      try {
        const res = await postEmail(email.value, userId);
      } catch {
        toast.error('이메일 변경에 실패했습니다');
      }
    }
  };

  // 유저정보가 있는지 확인
  useEffect(() => {
    // 유저id가 없을 경우
    if (!userId) {
      routeTo('/*');
      toast.error('잘못된 경로입니다');
    }

    // 유저정보가 없을 때
    if (getUserProfileError) {
      routeTo('/');
      toast.error('유저 정보가 존재하지 않습니다');
    }

    // 유저의 아이디가 존재할 때
    if (UserProfile && UserProfile.email) {
      routeTo('/');
      toast.error('email이 등록된 유저입니다');
    }
  }, [getUserProfileError, UserProfile]);

  return (
    <S.AddEmailContainer>
      {getUserProfileLoading ? (
        <Loading />
      ) : (
        <S.AddEmailLayout>
          <S.PageTitle>추가적으로 이메일을 등록해주세요</S.PageTitle>
          <TextBox text={'이메일'} {...email} />

          <S.ButtonContainer>
            <S.caution>*작성 완료 후 이메일은 수정이 불가합니다</S.caution>
            {isEmailDupulicateChecked ? (
              <S.SubmitBtn onClick={handlePostEmail}>작성 완료</S.SubmitBtn>
            ) : (
              <S.SubmitBtn onClick={handleCheckDuplicateEmailClick}>중복 검사</S.SubmitBtn>
            )}
          </S.ButtonContainer>
        </S.AddEmailLayout>
      )}
    </S.AddEmailContainer>
  );
};

export default AddEmail;
