import { useEffect } from 'react';
import { GetPortfolioPage, GetUserPortfolioPage } from '../types/index';
import type { FetchNextPageOptions, InfiniteQueryObserverResult } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

type useInfiniteScrollProps = {
  targetRef: React.MutableRefObject<HTMLDivElement | null>;
  isPortfoliosError: boolean;
  isPortfolioFetching: boolean;
  hasNextPortfolio: boolean | undefined;
  fetchNextPortfolio: (
    options?: FetchNextPageOptions | undefined,
  ) => Promise<InfiniteQueryObserverResult<GetPortfolioPage | GetUserPortfolioPage, AxiosError>>;
};

export function useInfiniteScroll({
  targetRef,
  isPortfoliosError,
  isPortfolioFetching,
  hasNextPortfolio,
  fetchNextPortfolio,
}: useInfiniteScrollProps) {
  useEffect(() => {
    const options = {
      root: null, // * viewport
      rootMargin: '100px',
      threshold: 0.3,
    };

    const handleIntersect: IntersectionObserverCallback = (
      entries: IntersectionObserverEntry[],
    ) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !isPortfoliosError && hasNextPortfolio) {
          fetchNextPortfolio();
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
  }, [fetchNextPortfolio, hasNextPortfolio, isPortfolioFetching]);
}
