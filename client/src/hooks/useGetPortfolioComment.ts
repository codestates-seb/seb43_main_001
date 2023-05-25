// react-query
import { useQuery } from '@tanstack/react-query';

// types
import { PortfolioCommentData } from '../types/index';

// api
import { PortfolioCommentAPI } from '../api/client';

const { getPortfolioComment } = PortfolioCommentAPI;

export const useGetPortfolioComment = (portfolioId: number, page: number) => {
  const {
    isLoading: PortfoliocommentLoading,
    data: PortfolioCommentData,
    isFetching: PortfolioCommentFetching,
    isPreviousData,
  } = useQuery<PortfolioCommentData, Error>({
    queryKey: ['comment', portfolioId, page],
    queryFn: () => getPortfolioComment(portfolioId, page),
    keepPreviousData: true,
    retry: false,
  });
  return {
    PortfoliocommentLoading,
    PortfolioCommentData,
    PortfolioCommentFetching,
    isPreviousData,
  };
};
