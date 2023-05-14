import { useEffect, useState } from 'react';
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
import { setAbout, setBlog, setImg, setJobStatus, setName } from '../../store/slice/userInfoSlice';
import { useUserInfo } from '../../hooks/useUserInfo';
import { useMutation } from '@tanstack/react-query';

const url = 'http://localhost:3001';
// const url = 'http://43.201.157.191:8080';

type IdProps = {
  id: string;
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

const UserInfo: React.FC<IdProps> = ({ id }) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState<User>();
  const [select, setSelect] = useState<boolean>(true);
  const [onEdit, setOnEdit] = useState<boolean>(false);

  // * : 유저 정보를 변경할 때 사용하는 redux-toolkit 정보
  const userEditInfo = useSelector((state: RootState) => {
    return state.userInfo;
  });

  // * : 유저 정보 수정시 실행
  const submitHandler = async () => {
    console.log(userEditInfo);
    // ! : 실제 사용에서는 /users/아이디
    await axios.patch(`${url}/users`, {
      // ! : 실제 사용에서는 ...user 사용 필요 없음
      ...user,
      ...userEditInfo,
    });
    // edtiUserInfoMutation.mutate(userEditInfo)
    setOnEdit(false);
  };
  // * : react-query 사용한 수정 함수(실사용에 적용되는지 확인 필요)
  const edtiUserInfoMutation = useMutation({
    mutationFn: (userEditInfo: any) => {
      return axios.patch(`${url}/users`, {
        // ! : 실제 사용에서는 ...user 사용 필요 없음
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
    dispatch(setName(user?.name));
    dispatch(setImg(user?.profileImg));
    dispatch(setAbout(user?.about));
    dispatch(setJobStatus(user?.jobStatus));
    dispatch(setBlog(user?.blogLink));
  };

  // * : 처음 유저 정보를 받아오는 함수
  const getData = async () => {
    // ! : 실제 사용을 할 때는 /users/1/profile
    await axios.get(`${url}/users`).then((res) => {
      // console.log(res.data);
      setUser(res.data);
    });
  };

  // * react-query를 사용한 getData
  // data가 어떻게 표현되는지 확인하고 적용할 것.
  // const { isLoading, data } = useUserInfo(id);

  useEffect(() => {
    getData();
  }, [onEdit]);

  return (
    <S.UserInfo>
      {user && (
        <>
          <UserBasicInfo
            onEdit={onEdit}
            profileImg={user.profileImg}
            name={user.name}
            gitLink={user.gitLink}
            auth={user.auth}
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
              {user.auth && (
                <>
                  {onEdit ? (
                    <UserEditForm
                      about={user.about}
                      jobStatus={user.jobStatus}
                      blogLink={user.blogLink}
                    />
                  ) : (
                    <UserDetailInfo
                      about={user.about}
                      jobStatus={user.jobStatus}
                      email={user.email}
                      blogLink={user.blogLink}
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
              <CommentContainer />
            </S.MoreInfo>
          )}
          {!select && <Portfolio />}
        </>
      )}
    </S.UserInfo>
  );
};

export default UserInfo;
