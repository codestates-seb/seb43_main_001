// react-query
import { useMutation, useQueryClient } from '@tanstack/react-query';

// api
import { PortfolioCommentAPI } from '../api/client';

const { patchPortfolioComment } = PortfolioCommentAPI;

type usePatchPortfolioCommentParams = {
  userId: number;
  portfolioCommentId: number;
  portfolioId: number;
};

export const usePatchPortfolioComment = (
  { portfolioCommentId, userId, portfolioId }: usePatchPortfolioCommentParams,
  page: number,
) => {
  const queryClient = useQueryClient();

  const { mutate: PatchComment } = useMutation({
    mutationFn: patchPortfolioComment,
    onSuccess: () => {
      // setqueryDAta[comment,protido.id];
      queryClient.invalidateQueries(['comment', portfolioId, page], { exact: true });
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const patchCommentAction = (content: string) => {
    PatchComment({ portfolioCommentId, userId, portfolioId, content });
  };

  return { patchCommentAction };
};
