import * as S from './Card.style';
import { useRouter } from '../../hooks/useRouter';

// 임시 데이터
const tagList = ['React', 'TypeScript', 'Redux'];

// TODO: API 완성되면 수정
type CardProps = {
  portfolioId?: string;
  description?: string;
  title?: string;
  views?: number;
  userId?: number;
  name?: string;
};

function Card({ portfolioId, description, title, views, userId, name }: CardProps) {
  const { routeTo } = useRouter();
  return (
    <S.Container
      onClick={() => {
        routeTo('/Detail/1');
        // routeTo(`/Detail/${portfolioId}`);
      }}
    >
      <S.Thumbnail>
        <img
          src='https://plus.unsplash.com/premium_photo-1672907031583-60041cf55a8f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'
          alt='포트폴리오 썸네일'
        />
      </S.Thumbnail>
      <S.Content>
        <S.CardContentWrapper>
          <h1>{title}</h1>
          <p>{description}</p>
        </S.CardContentWrapper>
        <S.CardInfoWrapper>
          <S.UserProfile>
            <S.UserImage
              onClick={(e) => {
                e.stopPropagation();
                routeTo('/User');
              }}
            >
              <img
                src='https://i.pinimg.com/originals/28/e0/40/28e0405ea8da9e7e33030be5580d9053.png'
                alt='프로필 이미지'
              />
            </S.UserImage>
            <S.UserName
              onClick={(e) => {
                e.stopPropagation();
                routeTo('/User');
              }}
            >
              {name}
            </S.UserName>
          </S.UserProfile>
          <S.TagWrapper>
            {/* TODO: index는 id로 수정 */}
            {tagList.map((tag, index) => (
              <S.Tag key={index}>{tag}</S.Tag>
            ))}
          </S.TagWrapper>
          <S.PostInfo>
            {/* TODO: 조회수, 추천수 숫자로 교체하기 */}
            <div>
              <S.ViewIcon />
              <span>{views}</span>
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
