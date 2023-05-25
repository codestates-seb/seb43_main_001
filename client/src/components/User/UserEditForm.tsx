import { useDispatch, useSelector } from 'react-redux';
import * as S from './UserEditForm.style';
import { setBlog, setAbout, setJobStatus } from '../../store/slice/editUserProfileSlice';
import { useState } from 'react';
import { RootState } from '../../store';
import { useDeleteUserProfile } from '../../hooks/useDeleteUserProfile';
import { useRouter } from '../../hooks/useRouter';
import { logout } from '../../store/slice/loginSlice';
import ConfirmationModal from '../common/ConfirmationModal';
import { setOpen } from '../../store/slice/modalSlice';

type UserEdit = {
  userId: number;
};
const UserEditForm: React.FC<UserEdit> = ({ userId }) => {
  const userEditInfo = useSelector((state: RootState) => {
    return state.editUserProfile;
  });
  const { routeTo } = useRouter();
  const { about, blogLink, jobStatus } = userEditInfo;

  const dispatch = useDispatch();
  const [userAbout, setUserAbout] = useState(about);
  const [userBlogLink, setBlogLink] = useState(blogLink);
  const { handlerDeleteUserProfile } = useDeleteUserProfile(userId);

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
  const onModalHandler = () => {
    dispatch(setOpen(null));
  };
  const deleteHandler = async () => {
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
      <S.DeleteBtn type='button' onClick={onModalHandler}>
        회원 탈퇴
      </S.DeleteBtn>
      <ConfirmationModal
        title='회원을 탈퇴하시겠습니까?'
        text1='회원을 탈퇴하시면 입력한 모든 정보가 삭제되며,'
        text2='복구할 수 없게 됩니다.'
        text3='정말로 탈퇴하시겠습니까?'
        onClickHandler={deleteHandler}
        type='warning'
      />
    </S.EditForm>
  );
};

export default UserEditForm;
