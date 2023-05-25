import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UserCommentsAPI } from '../api/client';
import { DeleteUserComment } from '../types';

const { deleteUserComment } = UserCommentsAPI;

export const useDeleteComment = (userId: number, portfolioId: number) => {
  const queryClient = useQueryClient();
  const { mutate: deleteUserCommentMutation } = useMutation(deleteUserComment, {
    onError: (e) => {
      console.error(e);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(['userComments', userId]);
      queryClient.invalidateQueries(['commentsToUser', userId]);
      queryClient.invalidateQueries(['commentsToPortfolio', userId]);
      if (portfolioId) {
        queryClient.invalidateQueries(['comment', portfolioId]);
      }
    },
  });
  const handlerDeleteUserComment = async ({ commentId, path }: DeleteUserComment) => {
    deleteUserCommentMutation({ commentId, path });
  };
  return { handlerDeleteUserComment };
};
