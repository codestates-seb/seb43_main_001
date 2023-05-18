import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UserCommentsAPI } from '../api/client';
import { DeleteUserComment } from '../types';

const { deleteUserComment } = UserCommentsAPI;

export const useDeleteComment = (userId: number, portfolioId: number) => {
  const queryClient = useQueryClient();
  const { mutate: deleteUserCommentMutation } = useMutation(deleteUserComment, {
    onMutate: () => {
      console.log('onMutate');
    },
    onError: (e) => {
      console.log(e);
    },
    onSuccess: (data) => {
      console.log(data, 'success');
      queryClient.invalidateQueries(['userComments', userId]);
      queryClient.invalidateQueries(['commentsToUser', userId]);
      queryClient.invalidateQueries(['commentsToPortfolio', userId]);
      if (portfolioId) {
        queryClient.invalidateQueries(['comment', portfolioId]);
      }
    },
    onSettled: () => {
      console.log('end');
    },
  });
  const handlerDeleteUserComment = async ({ commentId, path }: DeleteUserComment) => {
    deleteUserCommentMutation({ commentId, path });
  };
  return { handlerDeleteUserComment };
};
