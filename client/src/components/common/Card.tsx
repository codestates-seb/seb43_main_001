import * as S from './Card.style';
import { useRouter } from '../../hooks/useRouter';

// TODO: API 완성되면 수정
type CardProps = {
  portfolioId: number | string;
  description: string;
  title: string;
  views: number;
  userId?: number;
  name?: string;
  skills?: string[];
  representativeImgUrl?: string;
  profileImg?: string;
  likes?: number;
};

function Card({
  portfolioId,
  description,
  title,
  views,
  userId,
  name,
  skills,
  representativeImgUrl,
  profileImg,
  likes,
}: CardProps) {
  const { routeTo } = useRouter();

  const handleRouteUserPage = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    routeTo(`/User/${userId}`);
  };

  const viewTag = skills && skills.length > 3 ? skills?.slice(0, 3) : skills;
  const hideTagLength = skills && skills.length > 3 ? skills.length - 3 : null;

  return (
    <S.Container
      onClick={() => {
        routeTo(`/Detail/${portfolioId}`);
      }}
    >
      <S.Thumbnail>
        <img src={representativeImgUrl} alt='포트폴리오 썸네일' />
      </S.Thumbnail>
      <S.Content>
        <S.CardContentWrapper>
          <h1>{title}</h1>
          <p>{description}</p>
        </S.CardContentWrapper>
        <S.CardInfoWrapper>
          {userId && (
            <S.UserProfile>
              <S.UserImage onClick={handleRouteUserPage}>
                <img src={profileImg} alt='프로필 이미지' />
              </S.UserImage>
              <S.UserName onClick={handleRouteUserPage}>{name}</S.UserName>
            </S.UserProfile>
          )}
          <S.TagWrapper>
            {viewTag && viewTag.map((tag, index) => <S.Tag key={index}>{tag}</S.Tag>)}
            {hideTagLength && <span>+ {hideTagLength}</span>}
          </S.TagWrapper>
          <S.PostInfo>
            <div>
              <S.ViewIcon />
              <span>{views}</span>
            </div>
            <div>
              <S.LikeIcon />
              <span>{likes}</span>
            </div>
          </S.PostInfo>
        </S.CardInfoWrapper>
      </S.Content>
    </S.Container>
  );
}

export default Card;
