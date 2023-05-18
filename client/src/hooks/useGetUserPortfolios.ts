import { useQuery } from '@tanstack/react-query';
import { GetUserPortfolio } from '../types';
import { UserPortfolioAPI } from '../api/client';

const { getUserPortfolio } = UserPortfolioAPI;

export const useGetUserPortfolios = (userId: number) => {
  const {
    isLoading: getUserPortfoliosLoading,
    isError: getUserPortfoliosError,
    data: UserPortfolios,
  } = useQuery<GetUserPortfolio[], Error>({
    queryKey: ['userPortfolios', userId],
    queryFn: () => getUserPortfolio(userId),
  });
  return { getUserPortfoliosLoading, getUserPortfoliosError, UserPortfolios };
};
