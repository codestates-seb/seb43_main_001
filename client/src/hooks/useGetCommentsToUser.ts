import { useQuery } from '@tanstack/react-query';
import { GetUserComment } from '../types';
import { UserCommentsAPI } from '../api/client';

const { getCommentsToUser } = UserCommentsAPI;

export const useGetCommentsToUser = (userId: number) => {
  const {
    isLoading: getCommentsToUserLoading,
    isError: getCommentsToUserError,
    data: CommentsToUser,
  } = useQuery<GetUserComment[], Error>({
    queryKey: ['commentsToUser'],
    queryFn: () => getCommentsToUser(userId),
  });
  return { getCommentsToUserLoading, getCommentsToUserError, CommentsToUser };
};
