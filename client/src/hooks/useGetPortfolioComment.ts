// react-query
import { useQuery } from '@tanstack/react-query';

// types
import { GetPortfolioCommentById } from '../types/index';

// api
import { PortfolioCommentAPI } from '../api/client';

const { getPortfolioComment } = PortfolioCommentAPI;

export const useGetPortfolioComment = (portfolioId: number) => {
  const {
    isLoading: PortfoliocommentLoading,
    isError: PortfoliocommentError,
    data: PortfolioCommentData,
  } = useQuery<GetPortfolioCommentById[], Error>({
    queryKey: ['comment'],
    queryFn: () => getPortfolioComment(portfolioId),
  });
  return { PortfoliocommentLoading, PortfoliocommentError, PortfolioCommentData };
};
