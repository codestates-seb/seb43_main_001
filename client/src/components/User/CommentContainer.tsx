import * as S from './CommentContainer.style';
// import { user } from './mock';
import CommentItem from './CommentItem';
import { ChangeEvent, useState } from 'react';
import { useGetUserComments } from '../../hooks/useGetUserComment';
import { useGetCommentsToPortfolio } from '../../hooks/useGetCommentsToPortfolio';
import { useGetCommentsToUser } from '../../hooks/useGetCommentsToUser';
import { usePostUserComment } from '../../hooks/usePostUserComment';

type CommentProps = {
  userId: number;
};

const CommentContainer: React.FC<CommentProps> = ({ userId }) => {
  const [selectComment, setSelectComment] = useState(true);
  const [category, setCategory] = useState(true);
  const [content, setContent] = useState('');
  const { handlerPostUserComment } = usePostUserComment(userId);

  const addHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO : 데이터 전
    handlerPostUserComment(userId, content);
    setContent('');
  };
  const contentChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  // ! : 실제 테스트에서는 0 대신 id값 넣을 것
  const { UserComments } = useGetUserComments(userId);
  const { CommentsToPortfolio } = useGetCommentsToPortfolio(userId);
  const { CommentsToUser } = useGetCommentsToUser(userId);

  // ? : 유저 댓글과 포트폴리오 댓글이 남아있는 문제 < ?????

  return (
    <S.CommentContainer>
      <S.SelectBtn>
        <button onClick={() => setSelectComment(true)} className={selectComment ? 'select' : ''}>
          받은 댓글
        </button>
        <button onClick={() => setSelectComment(false)} className={selectComment ? '' : 'select'}>
          작성한 댓글
        </button>
      </S.SelectBtn>
      {selectComment ? (
        <>
          {UserComments && (
            <>
              {UserComments.length > 0 ? (
                <S.Comments CommentLen={UserComments.length}>
                  {UserComments.map((ele) => (
                    <CommentItem key={ele.userCommentId} data={ele} path='usercomments' />
                  ))}
                </S.Comments>
              ) : (
                <>
                  <p>작성된 댓글이 없습니다.</p>
                </>
              )}
            </>
          )}
          <S.CommentAdd onSubmit={addHandler}>
            <label htmlFor='Comment'></label>
            <textarea id='Comment' value={content} onChange={contentChangeHandler} />
            <S.Secret htmlFor='secret'>
              <span>비밀글</span>
              <input type='checkbox' id='secret' />
            </S.Secret>
            <button type='submit'>입력</button>
          </S.CommentAdd>
        </>
      ) : (
        <>
          <S.CategoryBtns>
            <button onClick={() => setCategory(true)} className={category ? 'select' : ''}>
              유저
            </button>
            <button onClick={() => setCategory(false)} className={category ? '' : 'select'}>
              포트폴리오
            </button>
          </S.CategoryBtns>
          {category ? (
            <>
              {CommentsToUser && (
                <>
                  {CommentsToUser.length > 0 ? (
                    <S.Comments CommentLen={CommentsToUser.length}>
                      {CommentsToUser.map((ele) => (
                        <CommentItem key={ele.userCommentId} data={ele} path='usercomments' />
                      ))}
                    </S.Comments>
                  ) : (
                    <>
                      <p>작성한 댓글이 없습니다.</p>
                    </>
                  )}
                </>
              )}
            </>
          ) : (
            <>
              {CommentsToPortfolio && (
                <>
                  {CommentsToPortfolio.length > 0 ? (
                    <S.Comments CommentLen={CommentsToPortfolio.length}>
                      {CommentsToPortfolio.map((ele) => (
                        <CommentItem
                          key={ele.userCommentId}
                          data={ele}
                          path='portfoliocomments'
                        />
                      ))}
                    </S.Comments>
                  ) : (
                    <>
                      <p>작성한 댓글이 없습니다.</p>
                    </>
                  )}
                </>
              )}
            </>
          )}
        </>
      )}
    </S.CommentContainer>
  );
};

export default CommentContainer;
