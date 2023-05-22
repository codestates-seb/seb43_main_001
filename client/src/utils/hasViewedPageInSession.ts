export const hasViewedPageInSession = (portfolioId: number): boolean => {
  const isViewed: string | null = sessionStorage.getItem(`portfolio-${portfolioId}`);
  if (isViewed === 'true') {
    return true;
  }
  return false;
};
