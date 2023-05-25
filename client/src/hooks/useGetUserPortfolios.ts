import { useInfiniteQuery } from '@tanstack/react-query';
import { PageParam } from '../types';
import { UserPortfolioAPI } from '../api/client';

const { getUserPortfolio } = UserPortfolioAPI;

export const useGetUserPortfolios = (userId: number, size: string, sortOption: string) => {
  const {
    isLoading: getUserPortfoliosLoading,
    isError: getUserPortfoliosError,
    isFetched: getUserPortfoliosFetched,
    data: UserPortfolios,
    status: userPortfoliosStatus,
    fetchNextPage: fetchNextUserPortfolios,
    hasNextPage: hasNextUserPortfolios,
  } = useInfiniteQuery({
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
    getUserPortfoliosLoading,
    getUserPortfoliosError,
    getUserPortfoliosFetched,
    UserPortfolios,
    userPortfoliosStatus,
    fetchNextUserPortfolios,
    hasNextUserPortfolios,
  };
};
