import { useState } from 'react';
import { YellowBtn } from '../common/Button.style';
// import { user } from './mock';
import * as S from './UserInfo.style';
import UserEditForm from './UserEditForm';
import UserBasicInfo from './UserBasicInfo';
import UserDetailInfo from './UserDetailInfo';
import Portfolio from './Portfolio';
import CommentContainer from './CommentContainer';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import axios from 'axios';
import {
  setAbout,
  setBlog,
  setImg,
  setJobStatus,
  setName,
} from '../../store/slice/editUserProfileSlice';
import { useMutation } from '@tanstack/react-query';
import Loading from '../common/Loading';
import { useGetUserProfile } from '../../hooks/useGetUserProfile';
import { UserProfileAPI } from '../../api/client';

const { patchUserProfile } = UserProfileAPI;

type IdProps = {
  userId: number;
};
export type User = {
  userId: number;
  email: string;
  name: string;
  profileImg: string;
  gitLink: string;
  blogLink: string;
  grade: string;
  jobStatus: string;
  about: string;
  auth: boolean;
};

const UserInfo: React.FC<IdProps> = ({ userId }) => {
  const dispatch = useDispatch();
  const [select, setSelect] = useState<boolean>(true);
  const [onEdit, setOnEdit] = useState<boolean>(false);

  // * : 유저 정보를 변경할 때 사용하는 redux-toolkit 정보
  const userEditInfo = useSelector((state: RootState) => {
    return state.editUserProfile;
  });

  // * : 유저 정보 수정시 실행
  const submitHandler = async () => {
    console.log(userEditInfo);

    // patchUserProfile(...userEditInfo)
    setOnEdit(false);
  };
  // * : react-query 사용한 수정 함수(실사용에 적용되는지 확인 필요)
  const edtiUserProfileMutation = useMutation({
    mutationFn: (userEditInfo: any) => {
      return axios.patch(`${process.env.REACT_APP_API_URL}/users`, {
        // ! : 실제 사용에서는 ...user 사용 필요 없음?
        ...userEditInfo,
      });
    },
    onSuccess: () => {
      console.log('success');
    },
    onError: () => {
      console.log('Error!');
    },
  });

  // * : edit버튼이 클릭되었을 때, 현재의 유저 정보를 수정 정보에 초기화 설정(redux에서 바로 초기화할 수 있는 방법이 있는지 찾아봐야 함)
  // * : 유저가 정보를 수정할 때, 현재 기본값을 받아오기 위해 실행
  const editHandler = () => {
    setOnEdit(true);
    dispatch(setName(UserInfo?.name));
    dispatch(setImg(UserInfo?.profileImg));
    dispatch(setAbout(UserInfo?.about));
    dispatch(setJobStatus(UserInfo?.jobStatus));
    dispatch(setBlog(UserInfo?.blogLink));
  };

  // ! : 실제 테스트에서는 0 대신 id값 넣을 것
  const { UserInfo, getUserInfoError } = useGetUserProfile(userId);

  // ! : 존재하지 않는 유저의 페이지인 경우 404 페이지로 이동 필요

  return (
    <S.UserInfo>
      {UserInfo ? (
        <>
          <UserBasicInfo
            onEdit={onEdit}
            profileImg={UserInfo.profileImg}
            name={UserInfo.name}
            gitLink={UserInfo.gitLink}
            auth={UserInfo.auth}
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
              {UserInfo.auth && (
                <>
                  {onEdit ? (
                    <UserEditForm
                      about={UserInfo.about}
                      jobStatus={UserInfo.jobStatus}
                      blogLink={UserInfo.blogLink}
                    />
                  ) : (
                    <UserDetailInfo
                      about={UserInfo.about}
                      jobStatus={UserInfo.jobStatus}
                      email={UserInfo.email}
                      blogLink={UserInfo.blogLink}
                    />
                  )}
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
