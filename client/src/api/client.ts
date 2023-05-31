// axios
import axios from 'axios';

// util
import { getNewAccessToken } from '../utils/getAccessToken';

// constant
import { URL } from '../constants';

import { toast } from 'react-toastify';

// types
import {
  PortfolioCommentData,
  GetPortfolio,
  GetPortfolioPage,
  PostPortfolioComment,
  PatchPortfolioComment,
  GetUserProfile,
  PatchUserProfile,
  DeletePortfolioComment,
  PostPortfolio,
  PatchPortfolio,
  PostUserComment,
  PatchUserComment,
  DeleteUserComment,
  LikeBtn,
  GetUserPortfolioPage,
  SignUp,
  Login,
  GetUserCommentPage,
} from '../types/index';

const { refreshUrl } = URL;
const tokenClient = axios.create({ baseURL: process.env.REACT_APP_API_URL });

tokenClient.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  if (!config.headers || !accessToken) {
    return config;
  }
  if (config.url === refreshUrl) {
    config.headers.Authorization = `Bearer ${refreshToken}`;
  } else {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

tokenClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken && error.response.status === 401) {
      toast.error('로그인 후 진행해주세요!');
      return Promise.reject(error);
    }

    // error handling
    if (error.response.status === 400) {
      toast.error('잘못된 요청입니다');
    } else if (error.response.status === 500) {
      toast.error('에러가 발생했습니다. 잠시후 다시 시도해 주세요.');
    } else if (error.response.status === 403) {
      toast.error('로그인 후 진행해주세요!');
    }
    if (error.response.status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { accessToken } = await getNewAccessToken();

        localStorage.setItem('accessToken', accessToken);

        const newAccessToken = localStorage.getItem('accessToken');

        originalRequest.headers.authorization = `Bearer ${newAccessToken}`;

        return await axios(originalRequest);
      } catch (error) {
        console.error(error);
      }
    }
    return Promise.reject(error);
  },
);

export const userAPI = {
  postSignUp: async ({ name, password, email }: SignUp) => {
    return await tokenClient.post(
      `/users/signup
    `,
      {
        name,
        password,
        email,
      },
    );
  },
  postLogin: async ({ username, password }: Login) => {
    const res = await tokenClient.post(
      `/users/login
    `,
      {
        username,
        password,
      },
    );
    return res;
  },
};

// * : Portfolio
export const PortfolioAPI = {
  uploadThumbnail: async (img: File | null, portfolioId: number): Promise<string> => {
    const formData = new FormData();

    formData.append('representativeImg', img ? img : new Blob(undefined));

    const { data } = await tokenClient.patch(
      `/portfolios/${portfolioId}/thumbnail-upload`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return data;
  },

  uploadImg: async (img: File): Promise<string> => {
    const formData = new FormData();
    formData.append('images', img);

    const { data } = await tokenClient.post('/portfolios/img-upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data[0];
  },

  getPortfolio: async (portfolioId: number): Promise<GetPortfolio> => {
    const PortfolioData = await tokenClient.get(
      `${process.env.REACT_APP_API_URL}/portfolios/${portfolioId}`,
    );
    return PortfolioData.data.data;
  },
  postPortfolio: async (Portfolio: PostPortfolio): Promise<GetPortfolio> => {
    const { postDto, representativeImg, files } = Portfolio;

    // 폼 데이터 형식 사용
    const formData = new FormData();

    const Dto = new Blob([JSON.stringify(postDto)], {
      type: 'application/json',
    });

    formData.append('postDto', Dto);
    if (representativeImg) formData.append('representativeImg', representativeImg);
    if (files) formData.append('files', files);

    return await tokenClient.post(`${process.env.REACT_APP_API_URL}/portfolios`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  patchPortfolio: async (Portfolio: PatchPortfolio): Promise<GetPortfolio> => {
    const { portfolioId, postDto, representativeImg, files } = Portfolio;

    // 폼 데이터 형식 사용
    // const formData = new FormData();

    // const Dto = new Blob([JSON.stringify(postDto)], {
    //   type: 'application/json',
    // });

    // formData.append('patchDto', Dto);
    // if (representativeImg) formData.append('representativeImg', representativeImg);
    // if (files) formData.append('files', files);

    return await tokenClient.patch(
      `${process.env.REACT_APP_API_URL}/portfolios/${portfolioId}`,
      postDto,
    );
  },
  getSortPortfolioList: async (
    page: number,
    size: string,
    sort: string,
  ): Promise<GetPortfolioPage> => {
    const sortPortfolio = await tokenClient.get(
      `/portfolios/search?page=${page}&size=${size}&sortBy=${sort}`,
    );

    return { ...sortPortfolio.data, currentPage: page };
  },
  getSearchPortfolioList: async (
    page: number,
    size: string,
    sort: string,
    category: string,
    value: string,
  ): Promise<GetPortfolioPage> => {
    const searchPortfolio = await tokenClient.get(
      `/portfolios/search?value=${value}&page=${page}&size=${size}&category=${category}&sortBy=${sort}`,
    );

    return { ...searchPortfolio.data, currentPage: page };
  },
  portfolioViews: async (portfolioId: number) => {
    return await tokenClient.get(`/portfolios/${portfolioId}/views`);
  },
  deletePortfolio: async (portfolioId: number) => {
    return await tokenClient.delete(`/portfolios/${portfolioId}`);
  },
};

export const PortfolioCommentAPI = {
  getPortfolioComment: async (portfolioId: number, page: number): Promise<PortfolioCommentData> => {
    const commentData = await tokenClient.get(`/api/portfoliocomments/portfolios/${portfolioId}`, {
      params: {
        page,
      },
    });
    return commentData.data;
  },
  postPortfolioComment: async ({ userId, portfolioId, content }: PostPortfolioComment) => {
    return await tokenClient.post('/api/portfoliocomments', {
      userId,
      portfolioId,
      content,
    });
  },
  patchPortfolioComment: async ({
    portfolioCommentId,
    userId,
    portfolioId,
    content,
  }: PatchPortfolioComment) => {
    return await tokenClient.patch(`/api/portfoliocomments/${portfolioCommentId}`, {
      portfolioCommentId,
      userId,
      portfolioId,
      content,
    });
  },
  deletePortfolioComment: async ({ portfolioCommentId }: DeletePortfolioComment) => {
    return await tokenClient.delete(`/api/portfoliocomments/${portfolioCommentId}`);
  },
};

// * : UserComponent
export const UserProfileAPI = {
  getUserProfile: async (userId: number): Promise<GetUserProfile> => {
    const userProfileData = await tokenClient.get(`/users/${userId}/profile`);
    return userProfileData.data.data;
  },
  postUserImg: async (userId: number, userImg: File) => {
    const profileImg = new FormData();
    profileImg.append('profileImg', userImg);
    const axiosConfig = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    return await tokenClient.post(`/users/${userId}/profile-img-upload`, profileImg, axiosConfig);
  },
  patchUserProfile: async ({
    userId,
    name,
    profileImg,
    gitLink,
    blogLink,
    jobStatus,
    about,
  }: PatchUserProfile) => {
    await tokenClient.patch(`/users/${userId}`, {
      name,
      profileImg,
      gitLink,
      blogLink,
      jobStatus,
      about,
    });
  },
  deleteUserProfile: async (userId: number) => {
    await tokenClient.delete(`/users/${userId}`);
  },
};

export const UserPortfolioAPI = {
  getUserPortfolio: async (
    userId: number,
    sort: string,
    page: number,
    size: string,
  ): Promise<GetUserPortfolioPage> => {
    const userPortfoliosData = await tokenClient.get(
      `/portfolios/users/${userId}?page=${page}&size=${size}&sortBy=${sort}`,
    );
    return { ...userPortfoliosData.data, currentPage: page };
  },
};

export const UserCommentsAPI = {
  getUserComments: async (
    userId: number,
    page: number,
    size: string,
  ): Promise<GetUserCommentPage> => {
    const userCommentsData = await tokenClient.get(
      `/api/usercomments/users/${userId}?page=${page}&size=${size}`,
    );
    return { ...userCommentsData.data, currentPage: page };
  },
  // * : 한 유저가 다른 사람의 포트폴리에 작성한 댓글
  getCommentsToPortfolio: async (
    userId: number,
    page: number,
    size: string,
  ): Promise<GetUserCommentPage> => {
    const commentsToPortfolioData = await tokenClient.get(
      `/api/portfoliocomments/users/${userId}?page=${page}&size=${size}`,
    );
    return { ...commentsToPortfolioData.data, currentPage: page };
  },
  // * : 한 유저가 다른 사람에게 작성한 댓글
  getCommentsToUser: async (
    userId: number,
    page: number,
    size: string,
  ): Promise<GetUserCommentPage> => {
    const commentsToUserData = await tokenClient.get(
      `/api/usercomments/writers/${userId}?page=${page}&size=${size}`,
    );
    return { ...commentsToUserData.data, currentPage: page };
  },
  postUserComment: async ({ userId, writerId, content, userCommentStatus }: PostUserComment) => {
    return await tokenClient.post('/api/usercomments', {
      userId,
      writerId,
      content,
      userCommentStatus,
    });
  },
  patchUserComment: async ({ userId, content, path, pathId, commentId }: PatchUserComment) => {
    await tokenClient.patch(
      `/api/${path}/${commentId}`,
      path === 'usercomments'
        ? {
            userCommentId: commentId,
            content,
            userId,
            writerId: pathId,
          }
        : { portfolioCommentId: commentId, userId, portfolioId: pathId, content },
    );
  },
  deleteUserComment: async ({ commentId, path }: DeleteUserComment) => {
    await tokenClient.delete(`/api/${path}/${commentId}`);
  },
};

export const PortfolioLikeBtn = {
  updateLikes: async ({ portfolioId, likes }: LikeBtn) => {
    if (likes) {
      await tokenClient.delete(`/portfolios/likes/${portfolioId}`);
    } else {
      await tokenClient.post(`/portfolios/likes/${portfolioId}`);
    }
  },
};

// * : Login
export const LoginAPI = {
  googleLogin: () => {
    // 로그인 시도
    window.location.assign(`${process.env.REACT_APP_API_URL}/oauth2/authorization/google`);
  },

  githubLogin: () => {
    // 로그인 시도
    window.location.assign(`${process.env.REACT_APP_API_URL}/oauth2/authorization/github`);
  },
};

// * : AddEmail
export const postEmail = async (email: string, userId: string) => {
  return await axios
    .patch(`${process.env.REACT_APP_API_URL}/addemail?userId=${userId}`, {
      email: email,
    })
    .then(() => LoginAPI.githubLogin());
};

// * : CheckEmail
export const postCheckEmail = async (email: string) => {
  return await tokenClient.post('/users/check-email', {
    email,
  });
};

export { tokenClient };
