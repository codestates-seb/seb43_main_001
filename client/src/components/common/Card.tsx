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
  representativeImgUrl?: string | null;
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
}: CardProps) {
  const { routeTo } = useRouter();

  const handleRouteUserPage = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    routeTo(`/User/${userId}`);
  };

  const capitalizeSkills = (skills: string[] | undefined) => {
    return skills?.map((tag) => {
      const words = tag.split(' ');
      const capitalizedWords = words.map((word) => word.charAt(0) + word.slice(1).toLowerCase());
      return capitalizedWords.join(' ');
    });
  };

  const techSkills = skills?.length ? capitalizeSkills(skills) : skills;

  return (
    <S.Container
      onClick={() => {
        routeTo(`/Detail/${portfolioId}`);
      }}
    >
      <S.Thumbnail>
        {/* {representativeImgUrl} */}
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
          {userId && (
            <S.UserProfile>
              <S.UserImage onClick={handleRouteUserPage}>
                <img
                  src='https://i.pinimg.com/originals/28/e0/40/28e0405ea8da9e7e33030be5580d9053.png'
                  alt='프로필 이미지'
                />
              </S.UserImage>
              <S.UserName onClick={handleRouteUserPage}>{name}</S.UserName>
            </S.UserProfile>
          )}
          <S.TagWrapper>
            {techSkills ? techSkills.map((tag, index) => <S.Tag key={index}>{tag}</S.Tag>) : null}
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
