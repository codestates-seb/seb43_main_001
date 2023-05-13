// User Profile
export type GetUserProfile = {
  userId: number;
  email: string;
  name: string;
  profileImg: string;
  gitLink: string;
  blogLink: string;
  grade: string;
  jobStatus: string;
  about: string;
  createdAt: string;
  updatedAt: string;
  auth: boolean;
};

// Portfolio
export type GetPortfolio = {
  portfolioId: number;
  userId: number;
  name: string;
  title: string;
  gitLink: string;
  distributionLink: string;
  description: string;
  content: string;
  views: number;
};

// Portfolio Comment

export type PostPortfolioComment = {
  userId: string;
  portfolioId: number;
  content: string;
};

export type PatchPortfolioComment = {
  portfolioCommentId: number;
  userId: number;
  portfolioId: number;
  content: string;
};

export type GetPortfolioCommentById = {
  portfolioCommentId: number;
  userId: number;
  userName: string;
  portfolioId: number;
  content: string;
  createdAt: string;
  updatedAt: string;
};

export type PortfolioCommentAPIArray = PatchPortfolioComment[] | any[];
