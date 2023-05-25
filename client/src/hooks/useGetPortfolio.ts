// react-query
import { useQuery } from '@tanstack/react-query';

// types
import { GetPortfolio } from '../types';

// api
import { PortfolioAPI } from '../api/client';

const { getPortfolio } = PortfolioAPI;

export const useGetPortfolio = (portfolioId: number) => {
  const {
    isLoading: getPortfolioLoading,
    isError: getPortfolioError,
    data: PortfolioInfo,
    error: ErrorInfo,
  } = useQuery<GetPortfolio, Error>({
    queryKey: ['portfolio', portfolioId],
    queryFn: () => getPortfolio(portfolioId),
    onError: (error) => {
      // Error이면 에러 페이지로 보내버린다???
      console.log('error', error);
    },
    retry: 2,
  });

  return { getPortfolioLoading, getPortfolioError, PortfolioInfo, ErrorInfo };
};
