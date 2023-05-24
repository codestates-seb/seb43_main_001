import { useDispatch, useSelector } from 'react-redux';
import { YellowBtn } from '../common/Button.style';
// import { user } from './mock';
import * as S from './UserBasicInfo.style';
import { setGit, setImg, setName } from '../../store/slice/editUserProfileSlice';
import { useState } from 'react';
import { RootState } from '../../store';
import { UserProfileAPI } from '../../api/client';

type UserBasicInfoProps = {
  userId: number;
  onEdit: boolean;
  name: string;
  profileImg: string;
  gitLink: string;
  auth: boolean;
  grade: string;
};
const UserBasicInfo: React.FC<UserBasicInfoProps> = ({
  userId,
  onEdit,
  name,
  profileImg,
  gitLink,
  grade,
}) => {
  const dispatch = useDispatch();
  const { postUserImg } = UserProfileAPI;
  const userEditInfo = useSelector((state: RootState) => {
    return state.editUserProfile;
  });
  const [photo, setPhoto] = useState<string>(profileImg);
  const [userName, setUserName] = useState<string>(name);
  // ! : input에 null값을 넣지 않기 위해 editSlice의 정보 사용,(서버에서 처리해주면 기존값 사용해도 괜찮음)
  const [userGit, setUserGit] = useState<string>(gitLink);
  const [gradecolor, setGradecolor] = useState<string>('brown');

  const fileUploadHanlder = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    const files = (target.files as FileList)[0];
    if (!files) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setPhoto(reader.result as string);
    };
    reader.readAsDataURL(files);
    postUserImg(userId, files)
      .then((res) => {
        console.log(res.data);
        dispatch(setImg(res.data));
      })
      .catch((e) => console.log(e));
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.currentTarget;
    if (name === 'name') {
      if (value.length >= 9) {
        value.slice(0, 9);
      }
      setUserName(value);
      dispatch(setName(value));
    } else {
      setUserGit(value);
      dispatch(setGit(value));
    }
  };

  // const changeGradeColor = () => {
  //   switch (grade) {
  //     case 'NOVICE':
  //       return setGradeColor('brown');
  //     case 'INTERMEDIATE':
  //       return setGradeColor('silver');
  //     case 'ADVANCED':
  //       return setGradeColor('gold');
  //     case 'EXPERT':
  //       return setGradeColor('red');
  //     case 'MASTER':
  //       return setGradeColor('');
  //     default:
  //       return setGradeColor('brown');
  //   }
  // };

  return (
    <S.BasicInfo>
      {onEdit ? (
        <S.EditImg>
          <div>
            이미지 <br />
            변경
          </div>
          <img src={photo} />
          <input id='attach-file' type='file' accept='image/*' onChange={fileUploadHanlder} />
        </S.EditImg>
      ) : (
        <S.UserImg>
          <img src={profileImg} />
        </S.UserImg>
      )}
      <S.TextBox>
        <S.UserNameBox>
          {onEdit ? (
            <S.EditName>
              Name
              <input onChange={inputChangeHandler} value={userName} name='name' maxLength={9} />
            </S.EditName>
          ) : (
            <S.UserName>
              <S.GradeIcon gradecolor={gradecolor} />
              <span>{name}</span>
            </S.UserName>
          )}
        </S.UserNameBox>
        {onEdit ? (
          <S.EditGit>
            <input
              value={userGit}
              onChange={inputChangeHandler}
              name='git'
              placeholder='깃허브 링크를 입력해주세요.'
            />
          </S.EditGit>
        ) : (
          <S.GitBtn>
            {gitLink ? (
              <a href={gitLink} target='_blank' rel='noreferrer'>
                <S.GithubIcon />
                <span>Github</span>
              </a>
            ) : (
              <>
                <S.GithubIcon />
              </>
            )}
          </S.GitBtn>
        )}
        {/* <div>
          <S.FollowrIcon />
          <span>123</span>
          <S.ViewIcon />
          <span>321</span>
        </div> */}
      </S.TextBox>
      {/* {!auth && (
        <S.Buttons>
          <YellowBtn>Follow</YellowBtn>
        </S.Buttons>
      )} */}
    </S.BasicInfo>
  );
};

export default UserBasicInfo;
