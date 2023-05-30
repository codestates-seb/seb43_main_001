import * as S from './CommentContainer.style';
import { useRef } from 'react';
import { useCommentsInfiniteScroll } from '../../hooks/useCommentsInfiniteScroll';
import CommentItem from './CommentItem';
import { useGetCommentsToPortfolio } from '../../hooks/useGetCommentsToPortfolio';

const CommentsToPortfolio: React.FC<{ userId: number }> = ({ userId }) => {
  const targetRef = useRef<HTMLDivElement | null>(null);

  const {
    CommentsToPortfolio,
    getCommentsToPortfolioError,
    getCommentsToPortfolioFetching,
    hasNextCommentsToPortfolio,
    fetchNextCommentsToPortfolio,
  } = useGetCommentsToPortfolio(userId, '6');

  useCommentsInfiniteScroll({
    targetRef,
    getUserCommentError: getCommentsToPortfolioError,
    getUserCommentFetching: getCommentsToPortfolioFetching,
    hasNextUserComment: hasNextCommentsToPortfolio,
    fetchNextUserComment: fetchNextCommentsToPortfolio,
  });

  return (
    <>
      {CommentsToPortfolio && (
        <>
          {CommentsToPortfolio.pages.length > 0 ? (
            <S.Comments CommentLen={CommentsToPortfolio.pages[0].data.length}>
              {CommentsToPortfolio.pages.map((page) =>
                page.data.map((data) => (
                  <CommentItem
                    key={data.portfolioCommentId}
                    data={data}
                    path='portfoliocomments'
                    link={true}
                  />
                )),
              )}
              <S.Target ref={targetRef} />
            </S.Comments>
          ) : (
            <>
              <p>작성된 댓글이 없습니다.</p>
            </>
          )}
        </>
      )}
    </>
  );
};

export default CommentsToPortfolio;
