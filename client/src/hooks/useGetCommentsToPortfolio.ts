import { useQuery } from '@tanstack/react-query';
import { GetUserComment } from '../types';
import { UserCommentsAPI } from '../api/client';

const { getCommentsToPortfolio } = UserCommentsAPI;

export const useGetCommentsToPortfolio = (userId: number) => {
  const {
    isLoading: getCommentsToPortfolioLoading,
    isError: getCommentsToPortfolioError,
    data: CommentsToPortfolio,
  } = useQuery<GetUserComment[], Error>({
    queryKey: ['commentsToPortfolio', userId],
    queryFn: () => getCommentsToPortfolio(userId),
  });
  return { getCommentsToPortfolioLoading, getCommentsToPortfolioError, CommentsToPortfolio };
};
