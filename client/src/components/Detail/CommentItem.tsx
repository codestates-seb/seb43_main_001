import * as S from './CommentItem.style';

// react hooks
import { useState } from 'react';

// custom Hooks
import { usePatchPortfolioComment } from '../../hooks/usePatchPortfolioComment';

type CommentItemProps = {
  content: string;
  createdAt: string[];
  userName: string;
  userId: number;
  portfolioCommentId: number;
  portfolioId: number;
};

// 상세 페이지 포트폴리오 댓글 아이템 컴포넌트
function CommentItem({
  content,
  createdAt,
  userName,
  userId,
  portfolioCommentId,
  portfolioId,
}: CommentItemProps) {
  const [onEdit, setOnEdit] = useState<boolean>(false);
  const [editInput, setEditInput] = useState<string>('');

  const { patchCommentAction } = usePatchPortfolioComment({
    userId,
    portfolioCommentId,
    portfolioId,
  });

  const handleComfirm = () => {
    patchCommentAction(editInput);
    setOnEdit(false);
  };

  const handleEditArea = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditInput(event.target.value);
  };

  return (
    <S.Container>
      <S.Update>
        <S.DelBtn />
        {!onEdit && <S.EditBtn onClick={() => setOnEdit(true)} />}
        {onEdit && <S.ComfirmBtn onClick={handleComfirm} />}
      </S.Update>
      {onEdit ? (
        <S.EditArea
          placeholder='Enter your comment here'
          value={editInput}
          onChange={handleEditArea}
        />
      ) : (
        <S.Content>{content}</S.Content>
      )}
      <S.CreateAt>
        {createdAt} {userName}
      </S.CreateAt>
    </S.Container>
  );
}

export default CommentItem;
