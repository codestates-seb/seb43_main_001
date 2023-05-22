import * as S from './DetailTitle.style';

// custom hooks
import { useRouter } from '../../hooks/useRouter';

type LinkName = readonly [string, string];

type DetailTileProps = {
  auth: boolean;
  userId: number;
  title: string;
  name: string;
  gitLink: string;
  distributionLink: string;
  skills: string[];
};
// 상세 페이지 포트폴리오 제목 및 사용자 정보
function DetailTitle({
  auth,
  userId,
  name,
  title,
  gitLink,
  distributionLink,
  skills,
}: DetailTileProps) {
  const { routeTo } = useRouter();

  const handleOnClickUserImg = () => {
    routeTo(`/User/${userId}`);
  };
  const linkName: LinkName = ['깃헙링크', '배포링크'];
  return (
    <S.DetailTitle>
      <S.TitleUpper>
        <S.ProjectTitle>{title}</S.ProjectTitle>
        <S.UserInfo>
          <S.userName>{name}</S.userName>
          <S.userImg onClick={handleOnClickUserImg}></S.userImg>
        </S.UserInfo>
      </S.TitleUpper>
      <S.TitleDowner>
        <S.Links>
          {linkName.map((name, idx) => {
            if (name === '깃헙링크') {
              return (
                <S.Link key={idx} darkGrey={true} href={`${gitLink}`}>
                  {name}
                </S.Link>
              );
            }
            return (
              <S.Link key={idx} href={`${distributionLink}`}>
                {name}
              </S.Link>
            );
          })}
        </S.Links>
        <S.Tags>
          {skills.map((tag, idx) => {
            return <S.YellowTagCutsom key={idx}>{tag}</S.YellowTagCutsom>;
          })}
        </S.Tags>
      </S.TitleDowner>
      <S.UserInfoEdit>
        {auth ? (
          <S.EditBox>
            <S.Edit>수정</S.Edit>
            <S.Delete>삭제</S.Delete>
          </S.EditBox>
        ) : null}
      </S.UserInfoEdit>
    </S.DetailTitle>
  );
}

export default DetailTitle;
