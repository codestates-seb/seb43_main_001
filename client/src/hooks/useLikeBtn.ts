// react-query
import { useMutation, useQueryClient } from '@tanstack/react-query';

// api
import { PortfolioLikeBtn } from '../api/client';

const { updateLikes } = PortfolioLikeBtn;

export const useLikeBtn = (portfolioId: number, likes: boolean) => {
  const queryClient = useQueryClient();

  const { isLoading: likeBtnLoading, mutate: clickLikeBtn } = useMutation({
    mutationFn: updateLikes,
    onMutate: async (portfolioId) => {
      await queryClient.cancelQueries({ queryKey: ['portfolio', portfolioId], exact: true });

      const snapshotOfPreviousPortfolio = queryClient.getQueryData(['portfolio', portfolioId]);

      queryClient.setQueryData(['portfolio', portfolioId], {
        likes: !likes,
      });
      return {
        snapshotOfPreviousPortfolio,
      };
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['portfolio', portfolioId]);
    },
    onError: (error, variable, snapshotOfPreviousPortfolio) => {
      queryClient.setQueryData(['portfolio', portfolioId], snapshotOfPreviousPortfolio);
    },
  });

  const handleLikeBtnClick = () => {
    clickLikeBtn({ portfolioId, likes });
  };
  return { likeBtnLoading, handleLikeBtnClick };
};
