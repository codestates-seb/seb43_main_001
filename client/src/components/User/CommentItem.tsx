import React, { FormEvent, useEffect, useRef, useState } from 'react';
import * as S from './CommentItem.style';
import { usePatchUserComment } from '../../hooks/usePatchUserComment';
import { useDeleteComment } from '../../hooks/useDeleteComment';
import { GetUserComment } from '../../types';
import { useRouter } from '../../hooks/useRouter';
import { useAppSelector } from '../../hooks/reduxHook';
import { getUserIdFromAccessToken } from '../../utils/getUserIdFromAccessToken';

type CommentItemProps = {
  data: GetUserComment;
  path: string;
  link: boolean;
};

const CommentItem: React.FC<CommentItemProps> = ({ data, path, link }) => {
  const { routeTo } = useRouter();
  const [onEdit, setOnEdit] = useState<boolean>(false);
  const CommentRef = useRef<HTMLTextAreaElement>(null);
  const [editText, setEditText] = useState<string>(data.content);
  const { handlePatchUserComment } = usePatchUserComment(data.userId, data.portfolioId!);
  const { handlerDeleteUserComment } = useDeleteComment(data.userId, data.portfolioId!);

  const secret = false;

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

  // TODO : Auth 적용
  // ! : 임시 코드. 서버에서 auth 받아오면 지울 것.
  const token = localStorage.getItem('accessToken');
  const isLogin = useAppSelector((state) => state.login.isLogin);
  const loginUser = getUserIdFromAccessToken(isLogin, token);

  const [isAuth, setIsAuth] = useState(false);
  const [isWriter, setIsWriter] = useState(false);

  useEffect(() => {
    if (loginUser === data.writerId) {
      setIsWriter(true);
    } else {
      setIsWriter(false);
    }
    if (loginUser === data.userId) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, [data, token]);

  // 비밀글 체크가 되어있는 경우, 작성자 & 수령자(?)를 제외하곤 *********** 표시 혹은 댓글을 아예 미표시
  // editText 부분이랑 CommentUser 부분만 ******* 으로 표시하는게 더 조건 걸기가 쉬울 것 같음.

  return (
    <S.CommentItem>
      {delConfirm ? (
        <>
          <S.DelText>해당 댓글을 삭제하시겠습니까?</S.DelText>
          <S.SelectBtns>
            <button onClick={deleteHandler}>삭제</button>
            <button onClick={delConfimHandler}>취소</button>
          </S.SelectBtns>
        </>
      ) : (
        <>
          {(isAuth || isWriter) && !onEdit && <S.DelBtn onClick={delConfimHandler} />}
          {isWriter && !onEdit && <S.EditBtn onClick={onEditHandler} />}
          {onEdit && <S.DelBtn onClick={onCancelHandler} />}
          {onEdit && <S.SubmitBtn onClick={onSubmitHandler} />}
          {onEdit ? (
            <form>
              <textarea ref={CommentRef} value={editText} onChange={onChangeHandler} />
            </form>
          ) : (
            <S.TextBox>{data.content}</S.TextBox>
          )}
          {/* 본인의 페이지 일 때는 표시하지 않기 */}
          {link && <S.LinkIcon onClick={onClickHandler} />}
          {secret ? (
            <></>
          ) : (
            <S.CommentUser>
              <span>{date}</span>
              <S.ImgBox>
                <img src={data.userProfileImg || data.writerProfileImg} />
              </S.ImgBox>
              <p>{data.writerName}</p>
            </S.CommentUser>
          )}
        </>
      )}
    </S.CommentItem>
  );
};

export default CommentItem;
