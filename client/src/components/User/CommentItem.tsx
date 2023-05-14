import React, { FormEvent, useRef, useState } from 'react';
import * as S from './CommentItem.style';
import axios from 'axios';
import { Comment } from './CommentContainer';

type CommentItemProps = {
  data: Comment;
  path: string;
};

const url = 'http://localhost:3001';

// TODO : 삭제 기능 구현
const CommentItem: React.FC<CommentItemProps> = ({ data, path }) => {
  const [onEdit, setOnEdit] = useState<boolean>(false);
  const CommentRef = useRef<HTMLTextAreaElement>(null);
  const [editText, setEditText] = useState<string>(data.content);
  const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditText(e.currentTarget.value);
  };
  const onSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();
    // await axios.post(url, {
    //   comment: editText,
    // });
    await axios.patch(`${url}/${path}`, {
      data: [
        {
          ...data,
          content: editText,
        },
      ],
    });
    setOnEdit(false);
  };

  return (
    <S.CommentItem>
      <S.DelBtn />
      {!onEdit && <S.EditBtn onClick={() => setOnEdit(true)} />}
      {onEdit && <S.SubmitBtn onClick={onSubmitHandler} />}
      {onEdit ? (
        <form>
          <textarea ref={CommentRef} value={editText} onChange={onChangeHandler} />
        </form>
      ) : (
        <p>{editText}</p>
      )}
      {/* 해당 유저/포트폴리오 페이지로 이동 */}
      {data.userId && !data.portfolioId && <S.LinkIcon />}
      {data.portfolioId && <S.LinkIcon />}
      <S.CommentUser>
        <span>{new Date(data.createdAt).toLocaleDateString()}</span>
        <S.ImgBox>{/* <img src={data.img} /> */}</S.ImgBox>
        <p>{data.writerName}</p>
      </S.CommentUser>
    </S.CommentItem>
  );
};

export default CommentItem;
