import React, { FormEvent, useRef, useState } from 'react';
import * as S from './CommentItem.style';
import { usePatchUserComment } from '../../hooks/usePatchUserComment';
import { useDeleteComment } from '../../hooks/useDeleteComment';
import { GetUserComment } from '../../types';
import { useRouter } from '../../hooks/useRouter';

type CommentItemProps = {
  data: GetUserComment;
  path: string;
};

const CommentItem: React.FC<CommentItemProps> = ({ data, path }) => {
  const { routeTo } = useRouter();
  const [onEdit, setOnEdit] = useState<boolean>(false);
  const CommentRef = useRef<HTMLTextAreaElement>(null);
  const [editText, setEditText] = useState<string>(data.content);
  const { handlePatchUserComment } = usePatchUserComment(data.userId, data.portfolioId!);
  const { handlerDeleteUserComment } = useDeleteComment(data.userId, data.portfolioId!);

  const date = `${data.createdAt[0]}. ${data.createdAt[1]}. ${data.createdAt[2]}`;
  const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditText(e.currentTarget.value);
  };
  const onSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();
    handlePatchUserComment({
      commentId: data.userCommentId ? data.userCommentId : data.portfolioCommentId!,
      content: editText,
      userId: data.userId,
      pathId: data.writerId ? data.writerId : data.portfolioId!,
      path,
    });
    setOnEdit(false);
  };
  const deleteHandler = async () => {
    handlerDeleteUserComment({
      commentId: data.userCommentId ? data.userCommentId : data.portfolioCommentId!,
      path,
    });
  };
  const onClickHandler = () => {
    if (path === 'usercomments') {
      console.log('?');
      routeTo(`/User/${data.userId}`);
    } else {
      routeTo(`/Detail/${data.portfolioId}`);
    }
  };
  // ! : 로그인한 유저 === 페이지 유저 : 삭제 버튼 보여야 함
  // ! : 로그인한 유저 === 작성자 : 삭제 & 수정 버튼 보여야 함
  // ! : Auth 데이터가 어떻게 도착하는지 보고 반영하기
  return (
    <S.CommentItem>
      <S.DelBtn onClick={deleteHandler} />
      {!onEdit && <S.EditBtn onClick={() => setOnEdit(true)} />}
      {onEdit && <S.SubmitBtn onClick={onSubmitHandler} />}
      {onEdit ? (
        <form>
          <textarea ref={CommentRef} value={editText} onChange={onChangeHandler} />
        </form>
      ) : (
        <p>{editText}</p>
      )}
      {/* 본인의 페이지 일 때는 표시하지 않기 */}
      <S.LinkIcon onClick={onClickHandler} />
      <S.CommentUser>
        <span>{date}</span>
        <S.ImgBox>
          <img src={data.userProfileImg || data.writerProfileImg} />
        </S.ImgBox>
        <p>{data.writerName}</p>
      </S.CommentUser>
    </S.CommentItem>
  );
};

export default CommentItem;
