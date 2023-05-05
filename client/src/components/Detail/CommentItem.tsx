import * as S from './CommentItem.style';

function CommentItem() {
  const dummyData = [
    {
      cotent:
        '소프트웨어 개발자(software developer)는, 시스템 분석가의 요구에 맞게 컴퓨터 프로그래밍을 하거나 시스템 설계를 하는 사람이다.',
      createAt: '2023/03/04',
    },
    {
      cotent:
        '소프트웨어 개발자(software developer)는, 시스템 분석가의 요구에 맞게 컴퓨터 프로그래밍을 하거나 시스템 설계를 하는 사람이다.',
      createAt: '2023/03/04',
    },
  ];

  return (
    <S.Container>
      <S.Update></S.Update>
    </S.Container>
  );
}

export default CommentItem;
