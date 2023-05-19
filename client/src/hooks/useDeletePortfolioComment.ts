// react-query
import { useMutation, useQueryClient } from '@tanstack/react-query';

// api
import { PortfolioCommentAPI } from '../api/client';

const { deletePortfolioComment } = PortfolioCommentAPI;

export const useDeleteProtfolioComment = (
  userId: number,
  portfolioId: number,
  portfolioCommentId: number,
) => {
  const queryClient = useQueryClient();

  const { mutate: deleteComment } = useMutation({
    mutationFn: deletePortfolioComment,
    onSuccess: () => {
      // !: userId를 받아와서 invalidate를 하면 될 듯하다.
      queryClient.invalidateQueries(['commentsToPortfolio', userId], { exact: true });
      queryClient.invalidateQueries(['comment', portfolioId], { exact: true });
    },
  });

  const handleOnClickDeleteBtn = () => {
    deleteComment({ portfolioCommentId });
  };

  return { handleOnClickDeleteBtn };
};
