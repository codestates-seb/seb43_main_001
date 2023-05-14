import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// types
import { GetUserProfile } from '../types/index';

export const useUserInfo = (userId: string) => {
  // 추후에 API 파일로 이동하기
  // const getCommentData = async (state?: State): Promise<PortfolioCommentAPIArray> => {
  //   const commentData = await axios.get(`${process.env.REACT_APP_API_URL}/${state}`);
  //   return commentData.data;
  // };

  // !: API 파일로 이동해야 함!
  const getUserData = async (userId: string) => {
    const infoData = await axios.get(`${process.env.REACT_APP_API_URL}/users/${userId}/profile`);
    return infoData.data;
  };

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['user'],
    queryFn: () => getUserData(userId),
  });
  return { isLoading, isError, data, error };
};
