import { useInfiniteQuery } from '@tanstack/react-query';
import { PortfolioAPI } from '../api/client';

import { GetPortfolioPage, SortOption, PageParam } from '../types/index';
import type { AxiosError } from 'axios';

export const useGetPortfolioList = (sortOption: SortOption, category: string, value: string) => {
  const { getSortPortfolioList, getSearchPortfolioList } = PortfolioAPI;

  const {
    data: PortfolioData,
    isError: isPortfoliosError,
    isFetching: isPortfolioFetching,
    error: ErrorInfo,
    fetchNextPage: fetchNextPortfolio,
    hasNextPage: hasNextPortfolio,
  } = useInfiniteQuery<GetPortfolioPage, AxiosError>({
    queryKey: value
      ? ['portfolioList', { sortOption, category, value }]
      : ['portfolioList', { sortOption }],
    queryFn: ({ pageParam = 1 }: PageParam) =>
      value
        ? getSearchPortfolioList(pageParam, '6', sortOption, category, value)
        : getSortPortfolioList(pageParam, '6', sortOption),
    getNextPageParam: (lastPage) => {
      if (lastPage.currentPage >= lastPage.pageInfo.totalPages) {
        return undefined;
      } else {
        return lastPage.currentPage + 1;
      }
    },
    retry: false,
  });

  return {
    PortfolioData,
    isPortfoliosError,
    isPortfolioFetching,
    ErrorInfo,
    fetchNextPortfolio,
    hasNextPortfolio,
  };
};
