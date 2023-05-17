import { useDispatch } from 'react-redux';
import { YellowBtn } from '../common/Button.style';
// import { user } from './mock';
import * as S from './UserBasicInfo.style';
import { setImg, setName } from '../../store/slice/editUserProfileSlice';
import { useState } from 'react';

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
  const [photo, setPhoto] = useState<string>(profileImg);
  const [userName, setUserName] = useState<string>(name);
  const dispatch = useDispatch();
  const fileUploadHanlder = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    const files = (target.files as FileList)[0];
    if (!files) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setPhoto(reader.result as string);
    };
    reader.readAsDataURL(files);

    // ! : axios를 통해서 전달하는 부분은 file
    dispatch(setImg({ ...files }));
  };
  const nameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setUserName(value);
    dispatch(setName(value));
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
            <input onChange={nameHandler} value={userName} />
          </S.EditName>
        ) : (
          <S.UserName>{name}</S.UserName>
        )}
        <S.GitBtn>
          <a href={gitLink} target='_blank' rel='noreferrer'>
            <S.GithubIcon />
            <span>Github</span>
          </a>
        </S.GitBtn>
        <div>
          <S.FollowrIcon />
          {/* <span>{follower}</span> */}
          {/* <S.ViewIcon /> */}
          {/* <span>{view}</span> */}
        </div>
      </div>
      <S.Buttons>{!auth && <YellowBtn>Follow</YellowBtn>}</S.Buttons>
    </S.BasicInfo>
  );
};

export default UserBasicInfo;
