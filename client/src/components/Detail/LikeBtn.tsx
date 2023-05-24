import * as S from './LikeBtn.style';

// custom hook
import { useLikeBtn } from '../../hooks/useLikeBtn';

type LikeBtnProps = {
  likes: boolean;
  portfolioId: number;
};

// 상세 페이지 포트폴리오 추천 버튼
function LikeBtn({ likes, portfolioId }: LikeBtnProps) {
  const { likeBtnLoading, handleLikeBtnClick } = useLikeBtn(portfolioId, likes);
  return (
    <>
      {likeBtnLoading ? null : (
        <S.LikeBtnWrapper likes={likes} onClick={handleLikeBtnClick}>
          <S.LikeIcon />
        </S.LikeBtnWrapper>
      )}
    </>
  );
}

export default LikeBtn;
