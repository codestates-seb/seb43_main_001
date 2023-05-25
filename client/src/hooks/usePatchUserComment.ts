import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PatchUserComment } from '../types';
import { UserCommentsAPI } from '../api/client';

const { patchUserComment } = UserCommentsAPI;

export const usePatchUserComment = (userId: number, portfolioId: number) => {
  const queryClient = useQueryClient();
  const { mutate: patchUserCommentMutation } = useMutation(patchUserComment, {
    onError: (error) => {
      console.error(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['userComments', userId]);
      queryClient.invalidateQueries(['commentsToUser', userId]);
      queryClient.invalidateQueries(['commentsToPortfolio', userId]);
      if (portfolioId) {
        queryClient.invalidateQueries(['comment', portfolioId]);
      }
    },
  });
  const handlePatchUserComment = async ({
    userId,
    content,
    path,
    pathId,
    commentId,
  }: PatchUserComment) => {
    patchUserCommentMutation({
      userId,
      content,
      path,
      pathId,
      commentId,
    });
  };
  return { patchUserCommentMutation, handlePatchUserComment };
};
