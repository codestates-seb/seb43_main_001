import { useInfiniteQuery } from '@tanstack/react-query';
import { SortOption, PageParam } from '../types/index';
import { PortfolioAPI } from '../api/client';

const { getAllPortfolio, getSearchPortfolio } = PortfolioAPI;

// TODO: error, status 사용할지말지 정하기
export const useGetAllPortfolio = (size: string, sortOption: SortOption) => {
  const {
    data: PortfolioData,
    isError: isPortfoliosError,
    isFetching: isPortfolioFetching,
    error: ErrorInfo,
    status: portfolioStatus,
    fetchNextPage: fetchNextPortfolio,
    hasNextPage: hasNextPortfolio,
  } = useInfiniteQuery({
    // ? : queryKey, queryFn, parameter만 다르게 바꾸기..?
    queryKey: ['allPortfolio', sortOption],
    queryFn: ({ pageParam = 1 }: PageParam) => getAllPortfolio(pageParam, size, sortOption),
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
