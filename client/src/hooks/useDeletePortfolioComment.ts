// react-query
import { useMutation, useQueryClient } from '@tanstack/react-query';

// api
import { PortfolioCommentAPI } from '../api/client';

const { deletePortfolioComment } = PortfolioCommentAPI;

export const useDeleteProtfolioComment = (portfolioId: number, portfolioCommentId: number) => {
  const queryClient = useQueryClient();

  const { mutate: deleteComment } = useMutation({
    mutationFn: deletePortfolioComment,
    onSuccess: () => {
      queryClient.invalidateQueries(['comment', portfolioId], { exact: true });
    },
  });

  const handleOnClickDeleteBtn = () => {
    deleteComment({ portfolioCommentId });
  };

  return { handleOnClickDeleteBtn };
};
