import * as S from './DetailTitle.style';

// tuple로 type 지정하는 법 찾기
type LinkName = string[];

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
        <S.Tags>
          {dummy.map((tag, idx) => {
            return <S.YellowTagCutsom key={idx}>{tag}</S.YellowTagCutsom>;
          })}
        </S.Tags>
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
      </S.TitleDowner>
    </S.DetailTitle>
  );
}

export default DetailTitle;
