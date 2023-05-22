export const markPageViewedInSession = (portfolioId: number): void => {
  sessionStorage.setItem(`portfolio-${portfolioId}`, 'true');
};
