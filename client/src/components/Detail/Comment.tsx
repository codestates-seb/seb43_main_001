import * as S from './Comment.style';
// react hooks
import React, { useState } from 'react';

// react component
import CommentItem from './CommentItem';
import Loading from '../common/Loading';
import CommentPageBtn from './CommentPageBtn';

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
  const [page, setPage] = useState<number>(1);

  const { portfolioId } = useParams();

  const { PortfoliocommentLoading, PortfolioCommentData, isPreviousData } = useGetPortfolioComment(
    Number(portfolioId!),
    page,
  );
  const { postCommentAction } = usePostPortfolioComment(Number(portfolioId), page);

  // page info
  const pageArray = Array(PortfolioCommentData?.pageInfo.totalPages)
    .fill(0)
    .map((_, index) => index + 1);

  const lastPage = () => setPage(PortfolioCommentData?.pageInfo.totalPages || 1);

  const firstPage = () => setPage(1);

  // hanlder
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    postCommentAction(Number(portfolioId), content);
    setContent('');
  };

  const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  return (
    <S.Container>
      <S.CommentWrapper>
        <S.CommentForm onSubmit={handleSubmit}>
          <S.CommentArea
            placeholder='Enter your comment here'
            value={content}
            onChange={handleCommentChange}
          />
          <S.YellowBtnCustom>COMMENT</S.YellowBtnCustom>
        </S.CommentForm>
        {PortfoliocommentLoading ? (
          <Loading />
        ) : (
          <S.CommentShow>
            {(PortfolioCommentData?.data ?? []).map(
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
                    page={page}
                  />
                );
              },
            )}
          </S.CommentShow>
        )}
        <S.Nav>
          {pageArray.length !== 0 ? (
            <S.NavBtn onClick={firstPage} disabled={isPreviousData || page === 1}>
              &lt;&lt;
            </S.NavBtn>
          ) : null}
          {(pageArray ?? []).map((pageNumber) => (
            <CommentPageBtn
              key={pageNumber}
              pageNumber={pageNumber}
              setPage={setPage}
            ></CommentPageBtn>
          ))}
          {pageArray.length !== 0 ? (
            <S.NavBtn
              onClick={lastPage}
              disabled={isPreviousData || page === PortfolioCommentData?.pageInfo.totalPages}
            >
              &gt;&gt;
            </S.NavBtn>
          ) : null}
        </S.Nav>
      </S.CommentWrapper>
    </S.Container>
  );
}

export default Comment;
