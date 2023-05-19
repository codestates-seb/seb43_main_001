import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { PatchPortfolio } from '../types/index';
import { PortfolioAPI } from '../api/client';

const { patchPortfolio } = PortfolioAPI;

export const usePatchPortfolio = () => {
  const queryClient = useQueryClient();

  const { mutate: patchPortfolioMutation } = useMutation(patchPortfolio, {
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

  const handlePatch = async (Portfolio: PatchPortfolio) => {
    patchPortfolioMutation(Portfolio);
  };

  return { patchPortfolioMutation, handlePatch };
};
