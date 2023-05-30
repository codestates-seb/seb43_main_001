import * as S from './CommentContainer.style';
import { useRef } from 'react';
import { useCommentsInfiniteScroll } from '../../hooks/useCommentsInfiniteScroll';
import CommentItem from './CommentItem';
import { useGetCommentsToUser } from '../../hooks/useGetCommentsToUser';

const CommentsToUser: React.FC<{ userId: number }> = ({ userId }) => {
  const targetRef = useRef<HTMLDivElement | null>(null);

  const {
    CommentsToUser,
    getCommentsToUserError,
    getCommentsToUserFetching,
    hasNextCommentsToUser,
    fetchNextCommentsToUser,
  } = useGetCommentsToUser(userId, '6');

  useCommentsInfiniteScroll({
    targetRef,
    getUserCommentError: getCommentsToUserError,
    getUserCommentFetching: getCommentsToUserFetching,
    hasNextUserComment: hasNextCommentsToUser,
    fetchNextUserComment: fetchNextCommentsToUser,
  });

  return (
    <>
      {CommentsToUser && (
        <>
          {CommentsToUser.pages.length > 0 ? (
            <S.Comments CommentLen={CommentsToUser.pages[0].data.length}>
              {CommentsToUser.pages.map((page) =>
                page.data.map((data) => (
                  <CommentItem
                    key={data.userCommentId}
                    data={data}
                    path='usercomments'
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

export default CommentsToUser;
