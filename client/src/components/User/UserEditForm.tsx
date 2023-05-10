import * as S from './UserEditForm.style';

function UserEditForm() {
  return (
    <S.EditForm>
      <label>
        Intro
        <textarea placeholder='간단한 자기 소개를 적어 주세요.' />
      </label>
      <label>
        <S.CompanyIcon />
        {/* <input placeholder='현재 소속된 곳 혹은 구직 여부를 적어주세요.' /> */}
        <S.EditSelect>
          <option value='JOB_SEEKING'>구직중</option>
          <option value='ON_THE_JOB'>재직중</option>
          <option value='STUDENT'>학생</option>
        </S.EditSelect>
      </label>
      <label>
        <S.EmailIcon />
        <input placeholder='연락을 받을 수 있는 이메일을 적어주세요.' />
      </label>
      <label>
        <S.BlogIcon />
        <input placeholder='운영중인 블로그 등의 정보를 적어주세요.' />
      </label>
      <button type='button'>회원 탈퇴</button>
    </S.EditForm>
  );
}

export default UserEditForm;
