import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { PostPortfolio } from '../types/index';
import { PortfolioAPI } from '../api/client';

const { postPortfolio } = PortfolioAPI;

export const usePostPortfolio = () => {
  const queryClient = useQueryClient();

  const { mutate: postPortfolioMutation } = useMutation(postPortfolio, {
    onMutate: (variable) => {
      // ! invalidateQuerie 추가 여부 결정
      console.log('onMutate', variable);
    },
    onError: (error, variable, context) => {
      console.log(error);
    },
    onSuccess: (data, variables, context) => {
      console.log('success', data, variables, context);
    },
    onSettled: () => {
      console.log('end');
    },
  });

  const handlePost = async (Portfolio: PostPortfolio) => {
    postPortfolioMutation(Portfolio);
  };
  return { postPortfolioMutation, handlePost };
};
