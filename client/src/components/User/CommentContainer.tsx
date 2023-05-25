import * as S from './CommentContainer.style';
import CommentItem from './CommentItem';
import { ChangeEvent, useState } from 'react';
import { useGetUserComments } from '../../hooks/useGetUserComment';
import { useGetCommentsToPortfolio } from '../../hooks/useGetCommentsToPortfolio';
import { useGetCommentsToUser } from '../../hooks/useGetCommentsToUser';
import { usePostUserComment } from '../../hooks/usePostUserComment';
import { toast } from 'react-toastify';
import { useAppSelector } from '../../hooks/reduxHook';

type CommentProps = {
  userId: number;
};

const CommentContainer: React.FC<CommentProps> = ({ userId }) => {
  const [selectComment, setSelectComment] = useState(true);
  const [category, setCategory] = useState(true);
  const [content, setContent] = useState('');
  const { handlerPostUserComment } = usePostUserComment(userId);
  const [secret, setSecret] = useState(false);

  const isLogin = useAppSelector((state) => state.login.isLogin);

  const addHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isLogin) {
      return toast.error('로그인 후 진행해주세요.');
    }

    const userCommentStatus = secret ? 'PRIVATE' : 'PUBLIC';
    handlerPostUserComment(userId, content, userCommentStatus);
    setContent('');
  };
  const contentChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const { UserComments } = useGetUserComments(userId);
  const { CommentsToPortfolio } = useGetCommentsToPortfolio(userId);
  const { CommentsToUser } = useGetCommentsToUser(userId);

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
                  {UserComments.map((data) => (
                    <CommentItem
                      key={data.userCommentId}
                      data={data}
                      path='usercomments'
                      link={false}
                    />
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
            <textarea
              id='Comment'
              value={content}
              onChange={contentChangeHandler}
              placeholder='유저에게 댓글을 남겨보세요!'
            />
            <S.Secret htmlFor='secret'>
              <span>비밀글</span>
              <input
                type='checkbox'
                id='secret'
                checked={secret}
                onChange={() => setSecret((prev) => !prev)}
              />
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
                      {CommentsToUser.map((data) => (
                        <CommentItem
                          key={data.userCommentId}
                          data={data}
                          path='usercomments'
                          link={true}
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
          ) : (
            <>
              {CommentsToPortfolio && (
                <>
                  {CommentsToPortfolio.length > 0 ? (
                    <S.Comments CommentLen={CommentsToPortfolio.length}>
                      {CommentsToPortfolio.map((data) => (
                        <CommentItem
                          key={data.userCommentId}
                          data={data}
                          path='portfoliocomments'
                          link={true}
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
