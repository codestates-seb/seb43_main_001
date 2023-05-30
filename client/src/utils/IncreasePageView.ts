// react hook
import { useEffect } from 'react';

// util
import { hasViewedPageInSession } from './hasViewedPageInSession';
import { markPageViewedInSession } from './markPageViewedInSession';

// api
import { PortfolioAPI } from '../api/client';

const { portfolioViews } = PortfolioAPI;

export const IncreasePageView = (portfolioId: number) => {
  useEffect(() => {
    const viewed = hasViewedPageInSession(portfolioId);

    if (!viewed) {
      portfolioViews(portfolioId);
      markPageViewedInSession(portfolioId);
    }
  }, [portfolioId]);
};
