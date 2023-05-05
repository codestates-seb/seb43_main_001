import { YellowBtn } from '../common/button.style';
import { user } from './data';
import * as S from './User.style';

function BasicInfo() {
  return (
    <S.BasicInfo>
      <S.UserImg>
        <img src={user.img} />
      </S.UserImg>
      <div>
        <S.UserName>{user.name}</S.UserName>
        <button>
          <a href={user.github}>
            <S.GithubIcon />
            <span>Github</span>
          </a>
        </button>
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
}

export default BasicInfo;
