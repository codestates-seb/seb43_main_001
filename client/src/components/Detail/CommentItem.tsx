import * as S from './CommentItem.style';

type CommentItemProps = {
  content: string;
  createAt: string;
  userName: string;
};

function CommentItem({ content, createAt, userName }: CommentItemProps) {
  return (
    <S.Container>
      <S.Update></S.Update>
      <S.Content>{content}</S.Content>
      <S.CreateAt>
        {createAt} {userName}
      </S.CreateAt>
    </S.Container>
  );
}

export default CommentItem;
