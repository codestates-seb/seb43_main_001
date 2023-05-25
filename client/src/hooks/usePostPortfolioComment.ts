// react-query
import { useMutation, useQueryClient } from '@tanstack/react-query';

// util
import { getUserIdFromAccessToken } from '../utils/getUserIdFromAccessToken';

// redux
import { useAppSelector } from './reduxHook';

// api
import { PortfolioCommentAPI } from '../api/client';

const { postPortfolioComment } = PortfolioCommentAPI;

export const usePostPortfolioComment = (portfolioId: number, page: number) => {
  const token = localStorage.getItem('accessToken');
  const isLogin = useAppSelector((state) => state.login.isLogin);

  // ! 추후에 아래에 추가해야 함!
  const userId = getUserIdFromAccessToken(isLogin, token);

  const queryClient = useQueryClient();

  const { mutate: postComment } = useMutation({
    mutationFn: postPortfolioComment,
    onSuccess: () => {
      queryClient.invalidateQueries(['comment', portfolioId, page], { exact: true });
    },
    onError: (error) => {
      // *: error 헨들링 하기
    },
  });
  const postCommentAction = (portfolioId: number, content: string) => {
    if (userId === undefined) {
      alert('로그인 하세요!');
    } else {
      postComment({ userId, portfolioId, content });
    }
  };
  return { postCommentAction };
};
