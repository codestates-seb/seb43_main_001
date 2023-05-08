import * as S from './Comment.style';
// react hooks
import React, { useState } from 'react';

// react component
import CommentItem from './CommentItem';

// dummyData
import { dummyData } from './mock';

function Comment() {
  const [comment, setComment] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setComment('');
  };

  const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
  };
  return (
    <S.Container>
      <S.CommentWrapper>
        <S.CommentShow>
          {dummyData.map((comment) => {
            const { id, content, createAt, userName } = comment;
            return (
              <CommentItem key={id} content={content} createAt={createAt} userName={userName} />
            );
          })}
        </S.CommentShow>
        <S.CommentForm onSubmit={handleSubmit}>
          <S.CommentArea
            placeholder='Enter your comment here'
            value={comment}
            onChange={handleCommentChange}
          />
          <S.YellowBtnCustom>COMMENT</S.YellowBtnCustom>
        </S.CommentForm>
      </S.CommentWrapper>
    </S.Container>
  );
}

export default Comment;
