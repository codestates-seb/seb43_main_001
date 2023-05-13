import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// types
import { PortfolioCommentAPIArray } from '../types/index';

export const useGetDetailPageComment = (portfolioId: string) => {
  // 추후에 API 파일로 이동하기
  // const getCommentData = async (state?: State): Promise<PortfolioCommentAPIArray> => {
  //   const commentData = await axios.get(`${process.env.REACT_APP_API_URL}/${state}`);
  //   return commentData.data;
  // };

  // !: API 파일로 이동해야 함!
  const getCommentData = async (portfolioId: string) => {
    const commentData = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/portfoliocomments/portfolios/${portfolioId}`,
    );
    return commentData.data;
  };

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['comment'],
    queryFn: () => getCommentData(portfolioId),
  });
  return { isLoading, isError, data, error };
};
