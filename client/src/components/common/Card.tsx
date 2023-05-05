import * as S from './Card.style';

function Card() {
  return (
    <S.Container>
      <S.Thumbnail>
        <img
          src='https://plus.unsplash.com/premium_photo-1672907031583-60041cf55a8f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'
          alt='포트폴리오 썸네일'
        />
      </S.Thumbnail>
      <S.Content>
        <S.CardContentWrapper>
          <h1>&#91;테스트&#93; 길이가 긴 제목입니다</h1>
          <p>
            프로젝트 소개글을 남기는 곳. 소개글은 60자 제한이 있습니다. 너무 길지도, 짧지도 않게
            작성해 주세요.
          </p>
        </S.CardContentWrapper>
        <S.CardInfoWrapper>
          <S.UserProfile>
            <S.UserImage>
              <img
                src='https://i.pinimg.com/originals/28/e0/40/28e0405ea8da9e7e33030be5580d9053.png'
                alt='프로필 이미지'
              />
            </S.UserImage>
            <S.UserName>사용자 이름</S.UserName>
          </S.UserProfile>
          <S.TagWrapper>태그</S.TagWrapper>
          <S.PostInfo>
            <div>
              <S.ViewIcon />
              <span>조회수</span>
            </div>
            <div>
              <S.LikeIcon />
              <span>추천수</span>
            </div>
          </S.PostInfo>
        </S.CardInfoWrapper>
      </S.Content>
    </S.Container>
  );
}

export default Card;
