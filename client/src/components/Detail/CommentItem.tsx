import * as S from './CommentItem.style';

// react hooks
import { useState, useRef, useEffect } from 'react';

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
  const [delConfirm, setDelConfirm] = useState<boolean>(false);
  const [editInput, setEditInput] = useState<string>(content);
  const EditRef = useRef<HTMLTextAreaElement>(null);
  const createdYear = createdAt[0];
  const createdMon = createdAt[1];
  const createdDay = createdAt[2];

  const { patchCommentAction } = usePatchPortfolioComment({
    userId,
    portfolioCommentId,
    portfolioId,
  });
  const { handleOnClickDeleteBtn } = useDeleteProtfolioComment(
    userId,
    portfolioId,
    portfolioCommentId,
  );

  const handleComfirm = () => {
    setOnEdit(false);
    patchCommentAction(editInput);
  };
  const handleEditArea = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditInput(event.target.value);
  };
  const handleDelete = () => {
    handleOnClickDeleteBtn();
    setDelConfirm((pre) => !pre);
  };
  const handleConfirmDelete = () => {
    setDelConfirm((pre) => !pre);
  };
  const handleConfirmCancelEdit = () => {
    setEditInput(content);
    setOnEdit(false);
  };
  const handleEdit = () => {
    setOnEdit(true);
    EditRef.current?.focus();
  };

  useEffect(() => {
    EditRef.current?.focus();
  }, [onEdit]);

  return (
    <S.Container>
      {delConfirm ? (
        <S.ConfirmDeleteSection>
          <S.DelText>해당 댓글을 삭제하시겠습니까?</S.DelText>
          <S.SelectBtns>
            <button onClick={handleDelete}>삭제</button>
            <button onClick={handleConfirmDelete}>취소</button>
          </S.SelectBtns>
        </S.ConfirmDeleteSection>
      ) : (
        <>
          {auth ? (
            <S.Update>
              <S.DelBtn onClick={onEdit ? handleConfirmCancelEdit : handleConfirmDelete} />
              {!onEdit && <S.EditBtn onClick={handleEdit} />}
              {onEdit && <S.ConfirmBtn className='confirm-icon' onClick={handleComfirm} />}
            </S.Update>
          ) : null}
          {onEdit ? (
            <S.EditArea
              ref={EditRef}
              placeholder='Enter your comment here'
              value={editInput}
              onChange={handleEditArea}
            />
          ) : (
            <S.Content>{content}</S.Content>
          )}
          <S.CreateAt>
            {`${createdYear}.${createdMon}.${createdDay}`}{' '}
            <img className='comment-userImg' src={userProfileImg} /> {userName}
          </S.CreateAt>
        </>
      )}
    </S.Container>
  );
}

export default CommentItem;
