import { YellowBtn } from '../common/Button.style';
import { user } from './mock';
import * as S from './UserBasicInfo.style';

type UserBasicInfoProps = {
  onEdit: boolean;
  photo: string;
};
const UserBasicInfo: React.FC<UserBasicInfoProps> = ({ onEdit, photo }) => {
  return (
    <S.BasicInfo>
      {onEdit ? (
        <S.EditImg>
          <div>
            이미지 <br />
            변경
          </div>
          <img src={photo} />
          <input id='attach-file' type='file' accept='image/*' />
        </S.EditImg>
      ) : (
        <S.UserImg>
          <img src={user.img} />
        </S.UserImg>
      )}
      <div>
        {onEdit ? (
          <S.EditName>
            Name
            <input />
          </S.EditName>
        ) : (
          <S.UserName>{user.name}</S.UserName>
        )}
        <S.GitBtn>
          <a href={user.github} target='_blank' rel='noreferrer'>
            <S.GithubIcon />
            <span>Github</span>
          </a>
        </S.GitBtn>
        <div>
          <S.FollowrIcon />
          <span>{user.follower}</span>
          <S.ViewIcon />
          <span>{user.view}</span>
        </div>
      </div>
      <S.Buttons>
        <YellowBtn>Follow</YellowBtn>
      </S.Buttons>
    </S.BasicInfo>
  );
};

export default UserBasicInfo;
