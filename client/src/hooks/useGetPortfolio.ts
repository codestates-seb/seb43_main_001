// react-query
import { useQuery } from '@tanstack/react-query';

// types
import { GetPortfolio } from '../types';

// api
import { PortfolioAPI } from '../api/client';

const { getPortfolio } = PortfolioAPI;

export const useGetPortfolio = (portfolioId: number) => {
  // ! 보통 데이터로 loading 여부를 판단한다. isError은 잘 사용 안 함
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
