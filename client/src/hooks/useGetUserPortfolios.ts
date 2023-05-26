import { useInfiniteQuery } from '@tanstack/react-query';
import { GetUserPortfolioPage, PageParam } from '../types';
import { UserPortfolioAPI } from '../api/client';
import { AxiosError } from 'axios';

const { getUserPortfolio } = UserPortfolioAPI;

export const useGetUserPortfolios = (userId: number, size: string, sortOption: string) => {
  const {
    data: UserPortfolios,
    isError: getUserPortfoliosError,
    isFetching: getUserPortfoliosFetching,
    error: ErrorInfo,
    status: userPortfoliosStatus,
    fetchNextPage: fetchNextUserPortfolios,
    hasNextPage: hasNextUserPortfolios,
    isLoading: getUserPortfolioLoading,
  } = useInfiniteQuery<GetUserPortfolioPage, AxiosError>({
    queryKey: ['userPortfolios', userId, sortOption],
    queryFn: ({ pageParam = 1 }: PageParam) =>
      getUserPortfolio(userId, sortOption, pageParam, size),
    getNextPageParam: (lastPage) => {
      if (lastPage.currentPage == lastPage.pageInfo.totalPages) {
        return undefined;
      } else {
        return lastPage.currentPage + 1;
      }
    },
    retry: false,
  });
  return {
    UserPortfolios,
    getUserPortfoliosError,
    getUserPortfoliosFetching,
    ErrorInfo,
    userPortfoliosStatus,
    fetchNextUserPortfolios,
    hasNextUserPortfolios,
    getUserPortfolioLoading,
  };
};
