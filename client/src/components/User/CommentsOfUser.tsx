import * as S from './CommentContainer.style';
import { useRef } from 'react';
import { useCommentsInfiniteScroll } from '../../hooks/useCommentsInfiniteScroll';
import { useGetUserComments } from '../../hooks/useGetUserComment';
import CommentItem from './CommentItem';

const CommentsOfUser: React.FC<{ userId: number }> = ({ userId }) => {
  const targetRef = useRef<HTMLDivElement | null>(null);

  const {
    UserComments,
    getUserCommentError,
    getUserCommentFetching,
    hasNextUserComment,
    fetchNextUserComment,
  } = useGetUserComments(userId, '6');

  useCommentsInfiniteScroll({
    targetRef,
    getUserCommentError,
    getUserCommentFetching,
    hasNextUserComment,
    fetchNextUserComment,
  });

  return (
    <>
      {UserComments && (
        <>
          {UserComments.pages.length > 0 ? (
            <S.Comments CommentLen={UserComments.pages[0].data.length}>
              {UserComments.pages.map((page) =>
                page.data.map((data) => (
                  <CommentItem
                    key={data.userCommentId}
                    data={data}
                    path='usercomments'
                    link={false}
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

export default CommentsOfUser;
