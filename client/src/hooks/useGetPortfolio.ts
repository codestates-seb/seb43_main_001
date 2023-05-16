// react-query
import { useQuery } from '@tanstack/react-query';

// types
import { GetPortfolio } from '../types';

// api
import { PortfolioAPI } from '../api/client';

const { getPortfolio } = PortfolioAPI;

export const useGetPortfolio = (userId: string) => {
  const {
    isLoading: getPortfolioLoading,
    isError: getPortfolioError,
    data: PortfolioInfo,
  } = useQuery<GetPortfolio, Error>({
    queryKey: ['portfolio', userId],
    queryFn: () => getPortfolio(userId),
  });

  return { getPortfolioLoading, getPortfolioError, PortfolioInfo };
};
