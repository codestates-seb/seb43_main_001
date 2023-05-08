import { YellowBtn } from '../common/Button';
import * as S from './Banner.style';

function Banner() {
  return (
    <S.Banner>
      <h1>이름</h1>
      <p>설명입니다설명입니다설명입니다설명입니다</p>
      <YellowBtn>공유하기</YellowBtn>
    </S.Banner>
  );
}

export default Banner;
