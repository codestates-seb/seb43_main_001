import { useDispatch, useSelector } from 'react-redux';
import * as S from './UserEditForm.style';
import { setBlog, setAbout, setJobStatus } from '../../store/slice/editUserProfileSlice';
import { useState } from 'react';
import { RootState } from '../../store';
import { useDeleteUserProfile } from '../../hooks/useDeleteUserProfile';
import { useRouter } from '../../hooks/useRouter';
import { logout } from '../../store/slice/loginSlice';

type UserEdit = {
  userId: number;
};
const UserEditForm: React.FC<UserEdit> = ({ userId }) => {
  const userEditInfo = useSelector((state: RootState) => {
    return state.editUserProfile;
  });
  const { about, blogLink, jobStatus } = userEditInfo;

  const dispatch = useDispatch();
  const [userAbout, setUserAbout] = useState(about);
  const [userBlogLink, setBlogLink] = useState(blogLink);
  const { handlerDeleteUserProfile } = useDeleteUserProfile();
  const { routeTo } = useRouter();

  const aboutHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const target = e.currentTarget.value;
    setUserAbout(target);
    dispatch(setAbout(target));
  };
  const blogHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget.value;
    setBlogLink(target);
    dispatch(setBlog(target));
  };
  const jobStatusHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const target = e.currentTarget.value;
    dispatch(setJobStatus(target));
  };
  const deleteHandler = async () => {
    // ! : 회원 탈퇴를 하는게 확실한지 확인창 띄우기(한번에 삭제까지 실행되지 않도록 해야 할 것 같음)
    handlerDeleteUserProfile(userId);
    dispatch(logout(null));
    routeTo('/');
  };
  return (
    <S.EditForm>
      <label>
        About
        <textarea
          placeholder='간단한 자기 소개를 적어 주세요.'
          onChange={aboutHandler}
          value={userAbout}
        />
      </label>
      <label>
        <S.CompanyIcon />
        <S.EditSelect onChange={jobStatusHandler} defaultValue={jobStatus}>
          <option value='JOB_SEEKING'>구직중</option>
          <option value='ON_THE_JOB'>재직중</option>
          <option value='STUDENT'>학생</option>
        </S.EditSelect>
      </label>
      <label>
        <S.EmailIcon />
        <p>: Email은 수정이 불가능합니다.</p>
      </label>
      <label>
        <S.BlogIcon />
        <input
          placeholder='운영중인 블로그 등의 정보를 적어주세요.'
          onChange={blogHandler}
          value={userBlogLink}
        />
      </label>
      <button type='button' onClick={deleteHandler}>
        회원 탈퇴
      </button>
    </S.EditForm>
  );
};

export default UserEditForm;
