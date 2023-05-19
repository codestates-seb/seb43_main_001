import { useInfiniteQuery } from '@tanstack/react-query';
import { SortOption, PageParam } from '../types/index';
import { PortfolioAPI } from '../api/client';

const { getSearchPortfolio } = PortfolioAPI;

export const useGetSearchPortfolio = (
  value: string,
  size: string,
  category: string,
  sortOption: SortOption,
) => {
  const {
    data: PortfolioData,
    isError: isPortfoliosError,
    isFetching: isPortfolioFetching,
    error: ErrorInfo,
    status: portfolioStatus,
    fetchNextPage: fetchNextPortfolio,
    hasNextPage: hasNextPortfolio,
  } = useInfiniteQuery({
    queryKey: ['searchPortfolio', sortOption, category, value],
    queryFn: ({ pageParam = 1 }: PageParam) =>
      getSearchPortfolio(value, pageParam, size, category, sortOption),
    getNextPageParam: (lastPage) => {
      if (lastPage.currentPage == lastPage.pageInfo.totalPages) {
        return undefined;
      } else {
        return lastPage.currentPage + 1;
      }
    },
  });

  return {
    PortfolioData,
    isPortfoliosError,
    isPortfolioFetching,
    ErrorInfo,
    portfolioStatus,
    fetchNextPortfolio,
    hasNextPortfolio,
  };
};
