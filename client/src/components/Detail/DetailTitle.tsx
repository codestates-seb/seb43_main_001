import * as S from './DetailTitle.style';

type LinkName = readonly [string, string];

// 상세 페이지 포트폴리오 제목 및 사용자 정보
function DetailTitle() {
  const dummy = ['JAVA', 'Spring'];
  const linkName: LinkName = ['깃헙링크', '배포링크'];
  return (
    <S.DetailTitle>
      <S.TitleUpper>
        <S.ProjectTitle>제목이 있는 곳</S.ProjectTitle>
        <S.UserInfo>
          <S.userName>Kimcoding</S.userName>
          <S.userImg></S.userImg>
        </S.UserInfo>
      </S.TitleUpper>
      <S.TitleDowner>
        <S.Links>
          {linkName.map((name, idx) => {
            if (name === '깃헙링크') {
              return (
                <S.Link key={idx} darkGrey={true}>
                  {name}
                </S.Link>
              );
            }
            return <S.Link key={idx}>{name}</S.Link>;
          })}
        </S.Links>
        <S.Tags>
          {dummy.map((tag, idx) => {
            return <S.YellowTagCutsom key={idx}>{tag}</S.YellowTagCutsom>;
          })}
        </S.Tags>
      </S.TitleDowner>
    </S.DetailTitle>
  );
}

export default DetailTitle;
