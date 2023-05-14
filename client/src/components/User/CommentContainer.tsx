import * as S from './CommentContainer.style';
// import { user } from './mock';
import CommentItem from './CommentItem';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';

const url = 'http://localhost:3001';
export type Comment = {
  userId: number;
  writerId: number;
  writerName: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  userCommentId?: number;
  portfolioCommentId?: number;
  portfolioId?: number;
};

const CommentContainer = () => {
  const [selectComment, setSelectComment] = useState(true);
  const [category, setCategory] = useState(true);
  const [content, setContent] = useState('');
  const [comment, setComment] = useState<Comment[]>();
  const [toUser, setToUser] = useState<Comment[]>();
  const [toPortfolio, setToPortfolio] = useState<Comment[]>();

  const addHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO : 데이터 전송
    // await axios.post(`${url}/comment`, {});
  };
  const contentChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };
  const getData = async () => {
    await axios.get(`${url}/comment`).then((res) => {
      setComment(res.data.data);
    });
    await axios.get(`${url}/toUser`).then((res) => {
      setToUser(res.data.data);
    });
    await axios.get(`${url}/toPortfolio`).then((res) => {
      setToPortfolio(res.data.data);
    });
  };

  useEffect(() => {
    getData();
  }, []);

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
          <S.Comments>
            {comment && (
              <>
                {comment.map((ele) => (
                  <CommentItem key={ele.userCommentId} data={ele} path='comment' />
                ))}
              </>
            )}
          </S.Comments>
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
            <S.Comments>
              {toUser?.map((ele) => (
                <CommentItem key={ele.userCommentId} data={ele} path='toUser' />
              ))}
            </S.Comments>
          ) : (
            <S.Comments>
              {toPortfolio?.map((ele) => (
                <CommentItem key={ele.portfolioCommentId} data={ele} path='toPortfolio' />
              ))}
            </S.Comments>
          )}
        </>
      )}
    </S.CommentContainer>
  );
};

export default CommentContainer;
