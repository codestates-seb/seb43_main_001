import { useInfiniteQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { PortfolioAPI } from '../api/client';
import { GetPortfolioPage, SortOption, PageParam } from '../types/index';
import type { AxiosError } from 'axios';

const { getSortPortfolioList, getSearchPortfolioList } = PortfolioAPI;

export const useGetPortfolioList = (sortOption: SortOption, category: string, value: string) => {
  const {
    data: PortfolioData,
    isError: isPortfoliosError,
    isFetching: isPortfolioFetching,
    error: ErrorInfo,
    status: portfolioStatus,
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
      if (lastPage.currentPage == lastPage.pageInfo.totalPages) {
        return undefined;
      } else {
        return lastPage.currentPage + 1;
      }
    },
    retry: false,
    onError: (error) => {
      if (error.response?.status === 400) {
        return toast.error('잘못된 요청입니다.');
      }

      if (error.response?.status === 500) {
        return toast.error('에러가 발생했습니다. 잠시후 다시 시도해 주세요.');
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
