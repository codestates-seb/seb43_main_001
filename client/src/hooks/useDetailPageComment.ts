import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// types
import { State, PortfolioCommentAPIArray } from '../types/index';

export const useDetailPageComment = (state?: State) => {
  // 추후에 API 파일로 이동하기
  const getCommentData = async (state?: State): Promise<PortfolioCommentAPIArray> => {
    const commentData = await axios.get(`http://localhost:3003/${state}`);
    return commentData.data;
  };

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['comment'],
    queryFn: () => getCommentData(state),
  });
  return { isLoading, isError, data, error };
};
