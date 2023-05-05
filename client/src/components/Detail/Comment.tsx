import * as S from './Comment.style';

// react hooks
import { useState } from 'react';

// common button
import { YellowBtn } from '../common/button.style';

function Comment() {
  const [comment, setComment] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setComment('');
  };

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };
  return (
    <S.Container>
      <S.CommentShow></S.CommentShow>
      <S.CommentForm onSubmit={handleSubmit}>
        <S.CommentInput type='text' value={comment} onChange={handleCommentChange} />
        <YellowBtn>COMMENT</YellowBtn>
      </S.CommentForm>
    </S.Container>
  );
}

export default Comment;
