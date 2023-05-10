export interface Example {
  id: number;
  name: string;
}

// Portfolio Comment

export type State = 'data' | 'pageInfo';

export type PortfolioCommentAPI = {
  portfolioCommentId: number;
  userId: number;
  portfolioId: number;
  userName: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

export type PortfolioCommentAPIArray = PortfolioCommentAPI[];
