// react-query
import { useMutation, useQueryClient } from '@tanstack/react-query';

// api
import { PortfolioAPI } from '../api/client';

// toast-library
import { toast } from 'react-toastify';

// custom hook
import { useRouter } from './useRouter';

const { deletePortfolio } = PortfolioAPI;

export const useDeletePortfolio = (portfolioId: number, userId: number) => {
  const { routeTo } = useRouter();
  const queryClient = useQueryClient();

  const { mutate: deletePortfolioAction } = useMutation({
    mutationFn: deletePortfolio,
    onSuccess: () => {
      queryClient.invalidateQueries(['portfolioList']);
      queryClient.invalidateQueries(['userPortfolios', userId]);
      toast.success('삭제되었습니다!');
      routeTo('/');
    },
    onError: () => {
      toast.error('삭제에 실패했습니다!');
    },
  });

  const handlePortfolioDelete = () => {
    deletePortfolioAction(portfolioId);
  };

  return { handlePortfolioDelete };
};
