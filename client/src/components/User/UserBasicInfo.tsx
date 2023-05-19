import { useDispatch, useSelector } from 'react-redux';
import { YellowBtn } from '../common/Button.style';
// import { user } from './mock';
import * as S from './UserBasicInfo.style';
import { setGit, setImg, setName } from '../../store/slice/editUserProfileSlice';
import { useState } from 'react';
import { RootState } from '../../store';

type UserBasicInfoProps = {
  onEdit: boolean;
  name: string;
  profileImg: string;
  gitLink: string;
  auth: boolean;
};
const UserBasicInfo: React.FC<UserBasicInfoProps> = ({
  onEdit,
  name,
  profileImg,
  gitLink,
  auth,
}) => {
  const dispatch = useDispatch();
  const userEditInfo = useSelector((state: RootState) => {
    return state.editUserProfile;
  });
  const { gitLink: editGitLink } = userEditInfo;
  const [photo, setPhoto] = useState<string>(profileImg);
  const [userName, setUserName] = useState<string>(name);
  // ! : input에 null값을 넣지 않기 위해 editSlice의 정보 사용,(서버에서 처리해주면 기존값 사용해도 괜찮음)
  const [userGit, setUserGit] = useState<string>(editGitLink);

  const fileUploadHanlder = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    const files = (target.files as FileList)[0];
    if (!files) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setPhoto(reader.result as string);
    };
    reader.readAsDataURL(files);
    dispatch(setImg({ ...files }));
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.currentTarget;
    if (name === 'name') {
      setUserName(value);
      dispatch(setName(value));
    } else {
      setUserGit(value);
      dispatch(setGit(value));
    }
  };

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
      <div>
        {onEdit ? (
          <S.EditName>
            Name
            <input onChange={inputChangeHandler} value={userName} name='name' />
          </S.EditName>
        ) : (
          <S.UserName>{name}</S.UserName>
        )}
        {onEdit ? (
          <S.EditGit>
            <S.GithubIcon />
            <input value={userGit} onChange={inputChangeHandler} name='git' />
          </S.EditGit>
        ) : (
          <S.GitBtn>
            <a href={gitLink} target='_blank' rel='noreferrer'>
              <S.GithubIcon />
              <span>Github</span>
            </a>
          </S.GitBtn>
        )}
        <div>
          <S.FollowrIcon />
          <span>123</span>
          <S.ViewIcon />
          <span>321</span>
        </div>
      </div>
      <S.Buttons>{!auth && <YellowBtn>Follow</YellowBtn>}</S.Buttons>
    </S.BasicInfo>
  );
};

export default UserBasicInfo;
