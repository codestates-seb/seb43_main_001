import { useEffect, useState } from 'react';
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

  const [windowSize, setWindowSize] = useState<number>(0);

  // * : 유저 정보를 변경할 때 사용하는 redux-toolkit 정보
  const userEditInfo = useSelector((state: RootState) => {
    return state.editUserProfile;
  });

  const token = localStorage.getItem('accessToken');

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

  useEffect(() => {
    setSelect(true);
    setOnEdit(false);

    function handleResize() {
      setWindowSize(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [userId, token]);

  // * : 수동으로 화면 크기를 조절할 때, 모바일/탭 화면에서 포트폴리오를 선택 후 화면을 키우면 유저 정보가 아니라 포트폴리오 화면만 중복해서 뜨는걸 방지하기 위한 코드
  // * : 더 좋은 방법이 생각나면 수정될 가능성 있음.
  useEffect(() => {
    if (windowSize >= 1200) {
      setSelect(() => true);
    }
  }, [windowSize]);

  // * : 유저가 정보를 수정할 때, 현재 기본값을 받아오기 위해 실행
  const editHandler = () => {
    dispatch(setName(UserProfile?.name));
    dispatch(setImg(UserProfile?.profileImg));
    dispatch(setAbout(UserProfile?.about));
    dispatch(setJobStatus(UserProfile?.jobStatus));
    dispatch(setBlog(UserProfile?.blogLink));
    setOnEdit(true);
  };

  const { UserProfile, getUserProfileError } = useGetUserProfile(userId);

  if (getUserProfileError) {
    return (
      <S.UserInfo>
        <p>유저 정보를 불러오지 못했습니다.</p>
      </S.UserInfo>
    );
  }

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
