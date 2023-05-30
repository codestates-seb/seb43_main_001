import React, { FormEvent, useEffect, useRef, useState } from 'react';
import * as S from './CommentItem.style';
import { usePatchUserComment } from '../../hooks/usePatchUserComment';
import { useDeleteComment } from '../../hooks/useDeleteComment';
import { GetUserComment } from '../../types';
import { useRouter } from '../../hooks/useRouter';

type CommentItemProps = {
  path: 'usercomments' | 'portfoliocomments';
  link: boolean;
  data: GetUserComment;
};

const CommentItem: React.FC<CommentItemProps> = ({ data, path, link }) => {
  const { routeTo } = useRouter();
  const [onEdit, setOnEdit] = useState<boolean>(false);
  const CommentRef = useRef<HTMLTextAreaElement>(null);
  const [editText, setEditText] = useState<string>(data.content);
  const { handlePatchUserComment } = usePatchUserComment(data.userId, data.portfolioId!);
  const { handlerDeleteUserComment } = useDeleteComment(data.userId, data.portfolioId!);

  const date = `${data.createdAt[0]}. ${data.createdAt[1]}. ${data.createdAt[2]}.`;

  const [delConfirm, setDelConfirm] = useState(false);

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
  const onCancelHandler = () => {
    setEditText(data.content);
    setOnEdit(false);
  };
  const deleteHandler = async () => {
    handlerDeleteUserComment({
      commentId: data.userCommentId ? data.userCommentId : data.portfolioCommentId!,
      path,
    });
  };
  const delConfimHandler = () => {
    setDelConfirm((prev) => !prev);
  };
  const onClickHandler = () => {
    if (path === 'usercomments') {
      routeTo(`/User/${data.userId}`);
    } else {
      routeTo(`/Detail/${data.portfolioId}`);
    }
  };

  const onEditHandler = () => {
    setOnEdit(true);
    CommentRef.current?.focus();
  };

  useEffect(() => {
    CommentRef.current?.focus();
  }, [onEdit]);

  if (delConfirm) {
    return (
      <S.CommentItem>
        <S.DelText>해당 댓글을 삭제하시겠습니까?</S.DelText>
        <S.SelectBtns>
          <button onClick={deleteHandler}>삭제</button>
          <button onClick={delConfimHandler}>취소</button>
        </S.SelectBtns>
      </S.CommentItem>
    );
  }

  if (data.status === 'PRIVATE' && !data.deletable) {
    return (
      <S.CommentItem>
        <S.SecretText>------ 비밀글로 작성된 댓글입니다. ------</S.SecretText>
        <S.CommentUser>***</S.CommentUser>
      </S.CommentItem>
    );
  }

  return (
    <S.CommentItem>
      {data.deletable && <S.DelBtn onClick={onEdit ? onCancelHandler : delConfimHandler} />}
      {path === 'portfoliocomments' && data.auth && (
        <S.DelBtn onClick={onEdit ? onCancelHandler : delConfimHandler} />
      )}
      {data.auth && !onEdit && <S.EditBtn onClick={onEditHandler} />}
      {onEdit && <S.SubmitBtn onClick={onSubmitHandler} />}
      {onEdit && (
        <form>
          <textarea ref={CommentRef} value={editText} onChange={onChangeHandler} />
        </form>
      )}
      {!onEdit && <S.TextBox>{data.content}</S.TextBox>}
      {link && <S.LinkIcon onClick={onClickHandler} />}
      <S.CommentUser>
        {data.status === 'PRIVATE' && <S.SecretIcon />}
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
