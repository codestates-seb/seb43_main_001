import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { PortfolioAPI } from '../api/client';
import { toast } from 'react-toastify';

import { PatchPortfolio } from '../types/index';

import { AxiosError } from 'axios';

import { useRouter } from './useRouter';

const { patchPortfolio } = PortfolioAPI;

export const usePatchPortfolio = (userId: number, portfolioId: number) => {
  const queryClient = useQueryClient();
  const { routeTo } = useRouter();
  const { mutate: patchPortfolioMutation } = useMutation(patchPortfolio, {
    onMutate: (variable) => {
      // console.log('onMutate', variable);
    },
    onError: (error: AxiosError) => {
      return toast.error('작성에 실패했습니다');
    },

    onSuccess: (data, variables, context) => {
      // console.log('success', data, variables, context);

      queryClient.invalidateQueries(['userProfile', userId]);
      queryClient.invalidateQueries(['portfolio', portfolioId]);
      queryClient.invalidateQueries(['userPortfolios', userId, 'createdAt']);
      queryClient.invalidateQueries(['portfolioList', 'createdAt']);
      queryClient.invalidateQueries(['portfolioList']);

      toast.success('성공적으로 작성되었습니다');
      return routeTo(`/Detail/${variables.portfolioId}`);
    },
    onSettled: () => {
      // console.log('end');
    },
  });

  const handlePatch = async (Portfolio: PatchPortfolio) => {
    patchPortfolioMutation(Portfolio);
  };

  return { patchPortfolioMutation, handlePatch };
};
