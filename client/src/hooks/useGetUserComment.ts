import { useInfiniteQuery } from '@tanstack/react-query';
import { GetUserCommentPage, PageParam } from '../types';
import { UserCommentsAPI } from '../api/client';
import { AxiosError } from 'axios';

const { getUserComments } = UserCommentsAPI;

export const useGetUserComments = (userId: number, size: string) => {
  const {
    data: UserComments,
    isError: getUserCommentError,
    isFetching: getUserCommentFetching,
    error: ErrorInfo,
    status: userCommentStatus,
    fetchNextPage: fetchNextUserComment,
    hasNextPage: hasNextUserComment,
    isLoading: getUserCommentLoading,
  } = useInfiniteQuery<GetUserCommentPage, AxiosError>({
    queryKey: ['userComments', userId],
    queryFn: ({ pageParam = 1 }: PageParam) => getUserComments(userId, pageParam, size),
    getNextPageParam: (lastPage) => {
      if (lastPage.currentPage === lastPage.pageInfo.totalPages) {
        return undefined;
      } else {
        return lastPage.currentPage + 1;
      }
    },
  });
  return {
    getUserCommentLoading,
    getUserCommentError,
    UserComments,
    getUserCommentFetching,
    ErrorInfo,
    userCommentStatus,
    fetchNextUserComment,
    hasNextUserComment,
  };
};
