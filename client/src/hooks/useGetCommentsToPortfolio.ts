import { useInfiniteQuery } from '@tanstack/react-query';
import { GetUserCommentPage, PageParam } from '../types';
import { UserCommentsAPI } from '../api/client';
import { AxiosError } from 'axios';

const { getCommentsToPortfolio } = UserCommentsAPI;

export const useGetCommentsToPortfolio = (userId: number, size: string) => {
  const {
    data: CommentsToPortfolio,
    isError: getCommentsToPortfolioError,
    isFetching: getCommentsToPortfolioFetching,
    error: ErrorInfo,
    status: CommentsToPortfolioStatus,
    fetchNextPage: fetchNextCommentsToPortfolio,
    hasNextPage: hasNextCommentsToPortfolio,
    isLoading: getCommentsToPortfolioLoading,
  } = useInfiniteQuery<GetUserCommentPage, AxiosError>({
    queryKey: ['commentsToPortfolio', userId],
    queryFn: ({ pageParam = 1 }: PageParam) => getCommentsToPortfolio(userId, pageParam, size),
    getNextPageParam: (lastPage) => {
      if (lastPage.currentPage === lastPage.pageInfo.totalPages) {
        return undefined;
      } else {
        return lastPage.currentPage + 1;
      }
    },
  });
  return {
    getCommentsToPortfolioLoading,
    getCommentsToPortfolioError,
    CommentsToPortfolio,
    getCommentsToPortfolioFetching,
    ErrorInfo,
    CommentsToPortfolioStatus,
    fetchNextCommentsToPortfolio,
    hasNextCommentsToPortfolio,
  };
};
