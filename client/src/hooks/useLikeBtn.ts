// react-query
import { useMutation, useQueryClient } from '@tanstack/react-query';

// api
import { PortfolioLikeBtn } from '../api/client';

const { updateLikes } = PortfolioLikeBtn;

export const useLikeBtn = (portfolioId: number, likes: boolean) => {
  const queryClient = useQueryClient();

  const { mutate: clickLikeBtn } = useMutation({
    mutationFn: updateLikes,
    onSuccess: () => {
      queryClient.invalidateQueries(['comment', portfolioId]);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleLikeBtnClick = () => {
    clickLikeBtn({ portfolioId, likes });
  };
  return { handleLikeBtnClick };
};
