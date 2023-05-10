import * as S from './Comment.style';
// react hooks
import React, { useState } from 'react';

// react component
import CommentItem from './CommentItem';
import Loading from '../common/Loading';

// custom hooks
import { useDetailPageComment } from '../../hooks/useDetailPageComment';

// types
import { PortfolioCommentAPI } from '../../types/index';

// 상세 페이지 포트폴리오 댓글 컴포넌트
function Comment() {
  const [comments, setComments] = useState<string>('');

  const { isLoading, isError, data, error } = useDetailPageComment('data');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setComments('');
  };

  const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComments(event.target.value);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <S.Container>
      <S.CommentWrapper>
        <S.CommentShow>
          {data?.map((comment: PortfolioCommentAPI) => {
            const { userId, content, createdAt, userName } = comment;
            return (
              <CommentItem
                key={userId}
                content={content}
                createdAt={createdAt}
                userName={userName}
              />
            );
          })}
        </S.CommentShow>
        <S.CommentForm onSubmit={handleSubmit}>
          <S.CommentArea
            placeholder='Enter your comment here'
            value={comments}
            onChange={handleCommentChange}
          />
          <S.YellowBtnCustom>COMMENT</S.YellowBtnCustom>
        </S.CommentForm>
      </S.CommentWrapper>
    </S.Container>
  );
}

export default Comment;
