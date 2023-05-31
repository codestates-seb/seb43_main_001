import * as S from './SignupForm.style';

// react-component
import SignInput from './SignInput';

// react hooks
import { useState } from 'react';

// custom Hook
import { useRouter } from '../../hooks/useRouter';
import { usePostUserSignUp } from '../../hooks/usePostUserSignUp';
import { usePostCheckEmail } from '../../hooks/usePostCheckEmail';

// toast
import { toast } from 'react-toastify';

function SignupForm() {
  const [userName, setUserName] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [userPassword, setUserPassword] = useState<string>('');
  const [isEmailDupulicateChecked, setEmailDuplicateChecked] = useState<boolean>(false);

  const [nameError, setNameError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [nameLengthError, setNameLengthError] = useState<boolean>(false);

  const { routeTo } = useRouter();
  const { postUserInfoSignUp } = usePostUserSignUp();
  const { handleCheckEmail } = usePostCheckEmail();

  const handleCheckDuplicateEmailClick = () => {
    if (userEmail === '') {
      return toast.info('이메일을 입력해주세요!');
    }
    handleCheckEmail(userEmail);
    setEmailDuplicateChecked(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userEmail === '') setEmailDuplicateChecked(false);
    if (!isEmailDupulicateChecked && userEmail !== '') {
      return toast.info('이메일 중복 검사를 진행해주세요!');
    }
    if (!isEmailDupulicateChecked) return;
    if (userName === '') return setNameError(true);
    else setNameError(false);
    if (userName.length > 9) return setNameLengthError(true);
    else setNameLengthError(false);
    if (userPassword.length < 8) return setPasswordError(true);
    else setPasswordError(false);
    postUserInfoSignUp({ name: userName, password: userPassword, email: userEmail });
  };
  return (
    <S.Container>
      <S.SignUpForm onSubmit={handleSubmit}>
        <S.Title>회원가입</S.Title>
        <SignInput
          type={'text'}
          name={'이름'}
          placeholder={'이름을 입력하세요(9자 이하로 입력해주세요!)'}
          value={userName}
          setValue={setUserName}
        />
        {nameError ? (
          <S.ErrorMessage>빈 문자는 제출할 수 없습니다</S.ErrorMessage>
        ) : nameLengthError ? (
          <S.ErrorMessage>9자 이하로 입력하셔야 합니다!</S.ErrorMessage>
        ) : null}
        <S.EmailWrapper>
          <SignInput
            type={'email'}
            name={'이메일'}
            placeholder={'이메일을 입력하세요'}
            value={userEmail}
            setValue={setUserEmail}
          />
          <S.checkDuplicateEmailButton type='button' onClick={handleCheckDuplicateEmailClick}>
            중복 검사
          </S.checkDuplicateEmailButton>
        </S.EmailWrapper>
        <SignInput
          type={'password'}
          name={'비밀번호'}
          placeholder={'비밀번호를 입력하세요(8자 이상)'}
          value={userPassword}
          setValue={setUserPassword}
        />
        {passwordError ? <S.ErrorMessage>8자 이상 입력하셔야 합니다</S.ErrorMessage> : null}
        <S.SignUpButton type='submit'>회원가입</S.SignUpButton>
        <S.AlreadySignUp>
          이미 계정이 있으신가요? <strong onClick={() => routeTo('/Login')}>로그인</strong>
        </S.AlreadySignUp>
      </S.SignUpForm>
    </S.Container>
  );
}

export default SignupForm;
