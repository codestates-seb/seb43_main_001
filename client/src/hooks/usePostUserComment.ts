import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UserCommentsAPI } from '../api/client';
import { useAppSelector } from './reduxHook';
import { getUserIdFromAccessToken } from '../utils/getUserIdFromAccessToken';

const { postUserComment } = UserCommentsAPI;

export const usePostUserComment = (userId: number) => {
  const token = useAppSelector((state) => state.login.accessToken);
  const isLogin = useAppSelector((state) => state.login.isLogin);
  const writerId = getUserIdFromAccessToken(isLogin, token);

  const queryClient = useQueryClient();
  const { mutate: postUserCommentMutation } = useMutation(postUserComment, {
    onMutate: () => {
      console.log('onMutate');
    },
    onError: (e) => {
      console.log(e);
    },
    onSuccess: (data) => {
      console.log(data, 'success');
      queryClient.invalidateQueries(['userComments', userId]);
    },
    onSettled: () => {
      console.log('end');
    },
  });
  const handlerPostUserComment = async (userId: number, content: string) => {
    if (writerId) {
      postUserCommentMutation({ userId, writerId, content });
    }
  };
  return { handlerPostUserComment };
};
