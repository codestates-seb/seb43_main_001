import * as S from './CommentItem.style';

// react hooks
import { useState } from 'react';

// custom Hooks
import { usePatchPortfolioComment } from '../../hooks/usePatchPortfolioComment';
import { useDeleteProtfolioComment } from '../../hooks/useDeletePortfolioComment';

type CommentItemProps = {
  content: string;
  createdAt: string[];
  userName: string;
  userId: number;
  portfolioCommentId: number;
  portfolioId: number;
  auth: boolean;
  userProfileImg: string;
};

// 상세 페이지 포트폴리오 댓글 아이템 컴포넌트
function CommentItem({
  content,
  createdAt,
  userName,
  userId,
  portfolioCommentId,
  portfolioId,
  auth,
  userProfileImg,
}: CommentItemProps) {
  const [onEdit, setOnEdit] = useState<boolean>(false);
  const [editInput, setEditInput] = useState<string>('');
  const createdYear = createdAt[0];
  const createdMon = createdAt[1];
  const createdDay = createdAt[2];

  const { patchCommentAction } = usePatchPortfolioComment({
    userId,
    portfolioCommentId,
    portfolioId,
  });
  const { handleOnClickDeleteBtn } = useDeleteProtfolioComment(portfolioId, portfolioCommentId);

  const handleComfirm = () => {
    patchCommentAction(editInput);
    setOnEdit(false);
  };

  const handleEditArea = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditInput(event.target.value);
  };

  return (
    <S.Container>
      {auth ? (
        <S.Update>
          <S.DelBtn onClick={handleOnClickDeleteBtn} />
          {!onEdit && <S.EditBtn onClick={() => setOnEdit(true)} />}
          {onEdit && <S.ComfirmBtn onClick={handleComfirm} />}
        </S.Update>
      ) : null}
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
        {`${createdYear}년 ${createdMon}월 ${createdDay}일`} {userName}
      </S.CreateAt>
    </S.Container>
  );
}

export default CommentItem;
