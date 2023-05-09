import * as S from './CommentItem.style';

// react hooks
import { useState } from 'react';

type CommentItemProps = {
  content: string;
  createAt: string;
  userName: string;
};

// 상세 페이지 포트폴리오 댓글 아이템 컴포넌트
function CommentItem({ content, createAt, userName }: CommentItemProps) {
  const [onEdit, setOnEdit] = useState<boolean>(false);

  return (
    <S.Container>
      <S.Update>
        <S.DelBtn />
        {!onEdit && <S.EditBtn onClick={() => setOnEdit(true)} />}
        {onEdit && <S.ComfirmBtn onClick={() => setOnEdit(false)} />}
      </S.Update>
      {onEdit ? (
        <S.EditArea placeholder='Enter your comment here' />
      ) : (
        <S.Content>{content}</S.Content>
      )}
      <S.CreateAt>
        {createAt} {userName}
      </S.CreateAt>
    </S.Container>
  );
}

export default CommentItem;
