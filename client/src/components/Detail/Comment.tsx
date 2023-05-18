import * as S from './Comment.style';
// react hooks
import React, { useState } from 'react';

// react component
import CommentItem from './CommentItem';
import Loading from '../common/Loading';

// custom hooks
import { useGetPortfolioComment } from '../../hooks/useGetPortfolioComment';
import { usePostPortfolioComment } from '../../hooks/usePostPortfolioComment';

// types
import { GetPortfolioCommentById } from '../../types/index';

// react-router-dom
import { useParams } from 'react-router-dom';

// 상세 페이지 포트폴리오 댓글 컴포넌트
function Comment() {
  const [content, setContent] = useState<string>('');

  const { portfolioId } = useParams();

  const { PortfoliocommentLoading, PortfolioCommentData } = useGetPortfolioComment(
    Number(portfolioId!),
  );
  const { postCommentAction } = usePostPortfolioComment(Number(portfolioId));

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    postCommentAction(Number(portfolioId), content);
    setContent('');
  };

  const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  // !: data가 없을 때 어떻게 표시되는지 꼭 확인해야 한다.
  return (
    <S.Container>
      <S.CommentWrapper>
        {PortfoliocommentLoading ? (
          <Loading />
        ) : (
          <S.CommentShow>
            {(PortfolioCommentData ?? []).map(
              (
                {
                  userId,
                  content,
                  createdAt,
                  userName,
                  portfolioCommentId,
                  portfolioId,
                  auth,
                  userProfileImg,
                }: GetPortfolioCommentById,
                index,
              ) => {
                return (
                  <CommentItem
                    key={index}
                    userId={userId}
                    content={content}
                    createdAt={createdAt}
                    userName={userName}
                    portfolioCommentId={portfolioCommentId}
                    portfolioId={portfolioId}
                    auth={auth}
                    userProfileImg={userProfileImg}
                  />
                );
              },
            )}
          </S.CommentShow>
        )}
        <S.CommentForm onSubmit={handleSubmit}>
          <S.CommentArea
            placeholder='Enter your comment here'
            value={content}
            onChange={handleCommentChange}
          />
          <S.YellowBtnCustom>COMMENT</S.YellowBtnCustom>
        </S.CommentForm>
      </S.CommentWrapper>
    </S.Container>
  );
}

export default Comment;
