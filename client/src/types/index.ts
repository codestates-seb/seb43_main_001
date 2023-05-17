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

export type GetUserPortfolio = {
  portfolioId: number;
  title: string;
  gitLink: string;
  distributionLink: string;
  description: string;
  content: string;
  views: number;
  createdAt: number[];
  updatedAt: number[];
};

export type GetUserComment = {
  userId: number;
  writerId: number;
  writerName: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  userCommentId?: number;
  portfolioCommentId?: number;
  portfolioId?: number;
};

export type PatchUserProfile = {
  userId: number;
  name: string;
  // 타입이 File이어야하는거 아닌지 문의하기
  profileImg: string;
  gitLink: string;
  blogLink: string;
  jobStatus: string;
  about: string;
};

// Portfolio
export type PostPortfolio = {
  userId: number;
  title: string;
  img: File;
  gitLink: string;
  distributionLink: string;
  description: string;
  tags: string[];
  content: string;
};

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
  skills: string[];
  updatedAt: number[];
  createdAt: number[];
};

// Portfolio Comment

export type PostPortfolioComment = {
  userId: number | undefined;
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
