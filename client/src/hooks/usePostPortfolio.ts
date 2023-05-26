import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { AxiosError } from 'axios';

import { PortfolioAPI } from '../api/client';
import { toast } from 'react-toastify';

import { PostPortfolio } from '../types/index';

import { useRouter } from './useRouter';

const { postPortfolio } = PortfolioAPI;

export const usePostPortfolio = (userId: number) => {
  const queryClient = useQueryClient();
  const { routeTo } = useRouter();

  const { mutate: postPortfolioMutation } = useMutation(postPortfolio, {
    onMutate: (variable) => {
      // console.log('onMutate', variable);
    },
    onError: (error: AxiosError) => {
      return toast.error('작성에 실패했습니다');
    },
    onSuccess: (data, variables, context) => {
      // console.log('success', data, variables, context);

      queryClient.invalidateQueries(['userProfile', userId]);
      queryClient.invalidateQueries(['userPortfolios', userId, 'createdAt']);
      queryClient.invalidateQueries(['portfolioList', 'createdAt']);
      queryClient.invalidateQueries(['portfolioList']);

      toast.success('성공적으로 작성되었습니다');
      return routeTo('/');
    },
    onSettled: () => {
      // console.log('end');
    },
  });

  const handlePost = async (Portfolio: PostPortfolio) => {
    postPortfolioMutation(Portfolio);
  };
  return { postPortfolioMutation, handlePost };
};
