import { useInfiniteQuery } from '@tanstack/react-query';
import { GetUserCommentPage, PageParam } from '../types';
import { UserCommentsAPI } from '../api/client';
import { AxiosError } from 'axios';

const { getCommentsToUser } = UserCommentsAPI;

export const useGetCommentsToUser = (userId: number, size: string) => {
  const {
    data: CommentsToUser,
    isError: getCommentsToUserError,
    isFetching: getCommentsToUserFetching,
    error: ErrorInfo,
    status: CommentsToUserStatus,
    fetchNextPage: fetchNextCommentsToUser,
    hasNextPage: hasNextCommentsToUser,
    isLoading: getCommentsToUserLoading,
  } = useInfiniteQuery<GetUserCommentPage, AxiosError>({
    queryKey: ['commentsToUser', userId],
    queryFn: ({ pageParam = 1 }: PageParam) => getCommentsToUser(userId, pageParam, size),
    getNextPageParam: (lastPage) => {
      if (lastPage.currentPage === lastPage.pageInfo.totalPages) {
        return undefined;
      } else {
        return lastPage.currentPage + 1;
      }
    },
  });
  return {
    getCommentsToUserLoading,
    getCommentsToUserError,
    CommentsToUser,
    getCommentsToUserFetching,
    ErrorInfo,
    CommentsToUserStatus,
    fetchNextCommentsToUser,
    hasNextCommentsToUser,
  };
};
