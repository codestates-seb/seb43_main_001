import * as S from './Comment.style';

// react hooks
import { useState } from 'react';

// common button
import { YellowBtn } from '../common/Button.style';

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

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };
  return (
    <S.Container>
      <S.CommentShow>
        {dummyData.map((comment) => {
          const { id, content, createAt, userName } = comment;
          return <CommentItem key={id} content={content} createAt={createAt} userName={userName} />;
        })}
      </S.CommentShow>
      <S.CommentForm onSubmit={handleSubmit}>
        <S.CommentInput type='text' value={comment} onChange={handleCommentChange} />
        <YellowBtn>COMMENT</YellowBtn>
      </S.CommentForm>
    </S.Container>
  );
}

export default Comment;
