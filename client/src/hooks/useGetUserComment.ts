import { useQuery } from '@tanstack/react-query';
import { GetUserComment } from '../types';
import { UserCommentsAPI } from '../api/client';

const { getUserComments } = UserCommentsAPI;

export const useGetUserComments = (userId: number) => {
  const {
    isLoading: getUserCommentLoading,
    isError: getUserCommentError,
    data: UserComments,
  } = useQuery<GetUserComment[], Error>({
    queryKey: ['userComments', userId],
    queryFn: () => getUserComments(userId),
  });
  return { getUserCommentLoading, getUserCommentError, UserComments };
};
