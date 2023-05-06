import * as S from './UserEditForm.style';

function UserEditForm() {
  return (
    <S.EditForm>
      <label>
        Intro
        <textarea />
      </label>
      <label>
        <S.CompanyIcon />
        <input />
      </label>
      <label>
        <S.EmailIcon />
        <input />
      </label>
      <label>
        <S.BlogIcon />
        <input />
      </label>
      <button type='button'>회원 탈퇴</button>
    </S.EditForm>
  );
}

export default UserEditForm;
