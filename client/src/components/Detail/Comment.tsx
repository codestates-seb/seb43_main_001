import * as S from './Comment.style';
// react hooks
import React, { useState } from 'react';

// react component
import CommentItem from './CommentItem';
import Loading from '../common/Loading';

// custom hooks
import { useGetDetailPageComment } from '../../hooks/useDetailPageComment';

// types
import { GetPortfolioCommentById } from '../../types/index';

// react-query
import { useQueryClient, useMutation } from '@tanstack/react-query';

// react-router-dom
import { useParams } from 'react-router-dom';

// axios
import axios from 'axios';

// 상세 페이지 포트폴리오 댓글 컴포넌트
function Comment() {
  const [comments, setComments] = useState<string>('');

  const { id } = useParams();

  // !: portfolioId를 넣어야 한다. id 값은 무조건 존재할 수 밖에 없음?
  const { isLoading, data } = useGetDetailPageComment(id!);

  const newComment = {
    portfolioCommentId: 6,
    portfolioId: 6,
    userName: 'test',
    content: comments,
    createdAt: '2023-05-08T14:20:53.326328',
    updatedAt: '2023-05-08T14:20:53.326328',
  };

  const queryClient = useQueryClient();

  // !: any 타입 변경이 필요하다! post이기 때문에 다른 방식으로 진행될듯!
  // !: 추가 검색이 필요하다.

  const newCommentMutation = useMutation({
    mutationFn: (newComment: any) => {
      return axios.post('http://localhost:3003/data', {
        ...newComment,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['comment']);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    newCommentMutation.mutate(newComment);
    setComments('');
  };

  const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComments(event.target.value);
  };

  // !: data가 없을 때 어떻게 표시되는지 꼭 확인해야 한다.
  return (
    <S.Container>
      {isLoading ? (
        <Loading />
      ) : (
        <S.CommentWrapper>
          <S.CommentShow>
            {data?.data.map((comment: GetPortfolioCommentById) => {
              const { userId, content, createdAt, userName, portfolioCommentId, portfolioId } =
                comment;
              return (
                <CommentItem
                  key={id}
                  userId={userId}
                  content={content}
                  createdAt={createdAt}
                  userName={userName}
                  portfolioCommentId={portfolioCommentId}
                  portfolioId={portfolioId}
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
      )}
    </S.Container>
  );
}

export default Comment;
