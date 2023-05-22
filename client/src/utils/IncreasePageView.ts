// react hook
import { useEffect } from 'react';

// react-query
import { useMutation, useQueryClient } from '@tanstack/react-query';

// util
import { hasViewedPageInSession } from './hasViewedPageInSession';
import { markPageViewedInSession } from './markPageViewedInSession';

// api
import { PortfolioAPI } from '../api/client';

const { portfolioViews } = PortfolioAPI;

export const IncreasePageView = (portfolioId: number) => {
  const queryClient = useQueryClient();

  const { mutate: increasePortfoiloView } = useMutation({
    mutationFn: portfolioViews,
    onSuccess: () => {
      console.log('성공');
      queryClient.invalidateQueries(['portfolio', portfolioId]);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  useEffect(() => {
    const viewed = hasViewedPageInSession(portfolioId);

    if (!viewed) {
      increasePortfoiloView(portfolioId);
      markPageViewedInSession(portfolioId);
    }
  }, [portfolioId]);
};
