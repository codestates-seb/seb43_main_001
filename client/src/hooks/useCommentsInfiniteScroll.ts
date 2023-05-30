import { useEffect } from 'react';
import { GetUserCommentPage } from '../types/index';
import type { FetchNextPageOptions, InfiniteQueryObserverResult } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

type useCommentsInfiniteScrollProps = {
  targetRef: React.MutableRefObject<HTMLDivElement | null>;
  getUserCommentError: boolean;
  getUserCommentFetching: boolean;
  hasNextUserComment: boolean | undefined;
  fetchNextUserComment: (
    options?: FetchNextPageOptions | undefined,
  ) => Promise<InfiniteQueryObserverResult<GetUserCommentPage, AxiosError>>;
};

export function useCommentsInfiniteScroll({
  targetRef,
  getUserCommentError,
  getUserCommentFetching,
  hasNextUserComment,
  fetchNextUserComment,
}: useCommentsInfiniteScrollProps) {
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '100px',
      threshold: 0.3,
    };

    const handleIntersect: IntersectionObserverCallback = (
      entries: IntersectionObserverEntry[],
    ) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !getUserCommentError && hasNextUserComment) {
          fetchNextUserComment();
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, options);

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
    };
  }, [fetchNextUserComment, hasNextUserComment, getUserCommentFetching]);
}
