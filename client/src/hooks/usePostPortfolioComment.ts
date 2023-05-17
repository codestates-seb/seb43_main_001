// react-query
import { useMutation, useQueryClient } from '@tanstack/react-query';

// util
import { getUserIdFromAccessToken } from '../utils/getUserIdFromAccessToken';

// redux
import { useAppSelector } from './reduxHook';

// api
import { PortfolioCommentAPI } from '../api/client';

const { postPortfolioComment } = PortfolioCommentAPI;

export const usePostPortfolioComment = () => {
  const token = useAppSelector((state) => state.login.accessToken);
  const isLogin = useAppSelector((state) => state.login.isLogin);

  const userId = getUserIdFromAccessToken(isLogin, token);

  const queryClient = useQueryClient();

  const { mutate: postComment } = useMutation({
    // 위 타입을 지정해줘야 함!
    mutationFn: postPortfolioComment,
    onSuccess: () => {
      console.log('일단 호출');
      // * setData로 특정 id에 해당 하는 데이터 사전 처리도 가능할듯!
      queryClient.invalidateQueries(['comment']);
    },
    onError: (error) => {
      // *: error 헨들링 하기
      console.log(error);
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
