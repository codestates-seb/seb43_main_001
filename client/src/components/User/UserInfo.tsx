import { useState } from 'react';
import { YellowBtn } from '../common/Button.style';
import * as S from './UserInfo.style';
import UserEditForm from './UserEditForm';
import UserBasicInfo from './UserBasicInfo';
import UserDetailInfo from './UserDetailInfo';
import Portfolio from './Portfolio';
import CommentContainer from './CommentContainer';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import {
  setAbout,
  setBlog,
  setImg,
  setJobStatus,
  setName,
} from '../../store/slice/editUserProfileSlice';
import Loading from '../common/Loading';
import { useGetUserProfile } from '../../hooks/useGetUserProfile';
import { usePatchUserProfile } from '../../hooks/usePatchUserProfile';

type IdProps = {
  userId: number;
};

const UserInfo: React.FC<IdProps> = ({ userId }) => {
  const dispatch = useDispatch();
  const [select, setSelect] = useState<boolean>(true);
  const [onEdit, setOnEdit] = useState<boolean>(false);

  const { handlerPatchProfile } = usePatchUserProfile(userId);

  // * : 유저 정보를 변경할 때 사용하는 redux-toolkit 정보
  const userEditInfo = useSelector((state: RootState) => {
    return state.editUserProfile;
  });

  // * : 유저 정보 수정시 실행
  const submitHandler = async () => {
    handlerPatchProfile({
      userId,
      name: userEditInfo.name,
      profileImg: userEditInfo.profileImg,
      gitLink: userEditInfo.gitLink,
      blogLink: userEditInfo.blogLink,
      jobStatus: userEditInfo.jobStatus,
      about: userEditInfo.about,
    });
    setOnEdit(false);
  };

  // * : edit버튼이 클릭되었을 때, 현재의 유저 정보를 수정 정보에 초기화 설정(redux에서 바로 초기화할 수 있는 방법이 있는지 찾아봐야 함)
  // * : 유저가 정보를 수정할 때, 현재 기본값을 받아오기 위해 실행
  const editHandler = () => {
    setOnEdit(true);
    dispatch(setName(UserProfile?.name));
    dispatch(setImg(UserProfile?.profileImg));
    dispatch(setAbout(UserProfile?.about));
    dispatch(setJobStatus(UserProfile?.jobStatus));
    dispatch(setBlog(UserProfile?.blogLink));
  };

  const { UserProfile } = useGetUserProfile(userId);

  return (
    <S.UserInfo>
      {UserProfile ? (
        <>
          <UserBasicInfo
            userId={userId}
            onEdit={onEdit}
            profileImg={UserProfile.profileImg}
            name={UserProfile.name}
            gitLink={UserProfile.gitLink}
            auth={UserProfile.auth}
            grade={UserProfile.grade}
          />
          <S.SelectBtn>
            <button onClick={() => setSelect(true)} className={select ? 'select' : ''}>
              유저 정보
            </button>
            <button onClick={() => setSelect(false)} className={select ? '' : 'select'}>
              포트 폴리오
            </button>
          </S.SelectBtn>
          {select && (
            <S.MoreInfo>
              <>
                {onEdit ? (
                  <UserEditForm userId={userId} />
                ) : (
                  <UserDetailInfo
                    about={UserProfile.about}
                    jobStatus={UserProfile.jobStatus}
                    email={UserProfile.email}
                    blogLink={UserProfile.blogLink}
                  />
                )}
                {UserProfile.auth && (
                  <>
                    {onEdit ? (
                      <S.DetailBtns>
                        <YellowBtn onClick={submitHandler}>수정 완료</YellowBtn>
                        <button onClick={() => setOnEdit(false)}>수정 취소</button>
                      </S.DetailBtns>
                    ) : (
                      <YellowBtn onClick={editHandler}>정보 수정</YellowBtn>
                    )}
                  </>
                )}
              </>
              <CommentContainer userId={userId} />
            </S.MoreInfo>
          )}
          {!select && <Portfolio userId={userId} />}
        </>
      ) : (
        <Loading />
      )}
    </S.UserInfo>
  );
};

export default UserInfo;
