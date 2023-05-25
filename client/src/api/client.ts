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
  GetUserComment,
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
        console.log('Error in getNewAccessToken: ', error);
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
    console.log(res);
    return res;
  },
};

// * : Portfolio
export const PortfolioAPI = {
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
    const formData = new FormData();

    const Dto = new Blob([JSON.stringify(postDto)], {
      type: 'application/json',
    });

    formData.append('patchDto', Dto);
    if (representativeImg) formData.append('representativeImg', representativeImg);
    if (files) formData.append('files', files);

    return await tokenClient.patch(
      `${process.env.REACT_APP_API_URL}/portfolios/${portfolioId}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
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
    return await tokenClient.patch(`/portfolios/${portfolioId}/views`);
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
    console.log('commentdata', commentData.data);
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
    // ! : 파일은 form 데이터로 전송
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
  getUserComments: async (userId: number): Promise<GetUserComment[]> => {
    const userCommentsData = await tokenClient.get(
      `/api/usercomments/users/${userId}?page=1&size=10`,
    );
    return userCommentsData.data.data;
  },
  // * : 한 유저가 다른 사람의 포트폴리에 작성한 댓글
  getCommentsToPortfolio: async (userId: number): Promise<GetUserComment[]> => {
    const commentsToPortfolioData = await tokenClient.get(`/api/portfoliocomments/users/${userId}`);
    return commentsToPortfolioData.data.data;
  },
  // * : 한 유저가 다른 사람에게 작성한 댓글
  getCommentsToUser: async (userId: number): Promise<GetUserComment[]> => {
    const commentsToUserData = await tokenClient.get(
      `/api/usercomments/writers/${userId}?page=1&size=10`,
    );
    return commentsToUserData.data.data;
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
  // ! : 전달되는게 어떤 id값인지 확인 필요
  deleteUserComment: async ({ commentId, path }: DeleteUserComment) => {
    await tokenClient.delete(`/api/${path}/${commentId}`);
  },
};

export const PortfolioLikeBtn = {
  updateLikes: async ({ portfolioId, likes }: LikeBtn) => {
    if (likes) {
      console.log('delete');
      await tokenClient.delete(`/portfolios/likes/${portfolioId}`);
    } else {
      console.log('post');
      await tokenClient.post(`/portfolios/likes/${portfolioId}`);
    }
  },
};

// * : Login
export const LoginAPI = {
  googleLogin: () => {
    // 로그인 시도
    window.location.assign(
      'http://ec2-43-201-157-191.ap-northeast-2.compute.amazonaws.com:8080/oauth2/authorization/google',
    );
  },

  githubLogin: () => {
    // 로그인 시도
    window.location.assign(
      'http://ec2-43-201-157-191.ap-northeast-2.compute.amazonaws.com:8080/oauth2/authorization/github',
    );
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
