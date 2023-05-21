// axios
import axios from 'axios';

// util
import { getNewAccessToken } from '../utils/getAccessToken';

// types
import {
  GetPortfolioCommentById,
  GetPortfolio,
  GetPortfolioPage,
  PostPortfolioComment,
  PatchPortfolioComment,
  GetUserPortfolio,
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
} from '../types/index';

const REFRESH_URL = ''; // refresh URL을 새롭게 추가를 해야 한다.
const tokenClient = axios.create({ baseURL: process.env.REACT_APP_API_URL });
// *: 요청하는 상태에 따라서 무조건 토큰을 담아서 보낸다.

tokenClient.interceptors.request.use((config) => {
  // * :요청 헤더가 있으면 기존의 것을 반환하고 없으면 아래 처럼 새롭게 지정해준다.
  // !login 상태가 아니면 그냥 일반 헤더 반환
  // !login 상태면 아래와 같이 그냥 진행
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  if (!config.headers || !accessToken) {
    return config;
  }
  // REFRESH_URL 기준으로 분류 처리를
  if (config.url === REFRESH_URL) {
    config.headers.Authorization = `Bearer ${refreshToken}`;
  } else {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// *: token을 사용하는 response 설정
tokenClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    // !판단 기준은 state.login에 토큰이 있냐 없냐로 판별해라
    // !로그인을 안 했을 때의 401은 그냥 reject(Promise)를 반환해라!
    const accessToken = localStorage.getItem('accessToken');

    // Login 상태가 아닐 때는 그냥 error을 반환하는 형식
    if (!accessToken && error.response.status === 401) {
      return Promise.reject(error);
    }

    // originalRequest._retry은 재시도 여부를 나타낸다(계속 요청하는 loop를 방지하기 위해)
    if (error.response.status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // refreshToken을 이용해 새로운 accessToken 발급
        const { accessToken } = await getNewAccessToken();

        // 새롭게 발급 받은 accessToken을 로컬 스토리지에 저장하기
        localStorage.setItem('accessToken', accessToken);
        const newAccessToken = localStorage.getItem('accessToken');
        // *:새롭게 받은 accessToken을 다시 기존의 요청 헤더 권한에 부여
        originalRequest.headers.authorization = `Bearer ${newAccessToken}`;

        // 실패했던 원래 요청에 대해 다시 요청을 보낸다.
        return await axios(originalRequest);
      } catch (error) {
        // refreshToken으로 accessToken 발급을 실패한 경우
        console.log('Error in getNewAccessToken: ', error);
        // 로그아웃 처리 등의 작업을 한다. 발급 실패를 했으니 어떻게 해야 하나?
        // 에러 페이지로 전환을 해야 할까?
      }
    }
    return Promise.reject(error);
  },
);

export const userAPI = {};

export const PortfolioAPI = {
  getPortfolio: async (portfolioId: number): Promise<GetPortfolio> => {
    const PortfolioData = await tokenClient.get(
      `${process.env.REACT_APP_API_URL}/portfolios/${portfolioId}`,
    );
    return PortfolioData.data.data;
  },
  postPortfolio: async (Portfolio: PostPortfolio): Promise<GetPortfolio> => {
    const { postDto, representativeImg, images, files } = Portfolio;

    // 폼 데이터 형식 사용
    const formData = new FormData();

    const Dto = new Blob([JSON.stringify(postDto)], {
      type: 'application/json',
    });

    formData.append('postDto', Dto);
    if (representativeImg) formData.append('representativeImg', representativeImg);
    if (images) formData.append('images', images);
    if (files) formData.append('files', files);

    return await tokenClient.post(`${process.env.REACT_APP_API_URL}/portfolios`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  patchPortfolio: async (Portfolio: PatchPortfolio): Promise<GetPortfolio> => {
    const { portfolioId, postDto, representativeImg, images, files } = Portfolio;

    // 폼 데이터 형식 사용
    const formData = new FormData();

    const Dto = new Blob([JSON.stringify(postDto)], {
      type: 'application/json',
    });

    formData.append('patchDto', Dto);
    if (representativeImg) formData.append('representativeImg', representativeImg);
    if (images) formData.append('images', images);
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
  getAllPortfolio: async (page: number, size: string, sort: string): Promise<GetPortfolioPage> => {
    const allPortfolio = await tokenClient.get(
      `/portfolios?page=${page}&size=${size}&sort=${sort}`,
    );
    return { ...allPortfolio.data, currentPage: page };
  },
  getSearchPortfolio: async (
    value: string,
    page: number,
    size: string,
    category: string,
    sort: string,
  ): Promise<GetPortfolioPage> => {
    const allSearchPortfolio = await tokenClient.get(
      `/search?value=${value}&page=${page}&size=${size}&category=${category}&sortBy=${sort}`,
    );
    return { ...allSearchPortfolio.data, currentPage: page };
  },
};

export const PortfolioCommentAPI = {
  getPortfolioComment: async (portfolioId: number): Promise<GetPortfolioCommentById[]> => {
    const commentData = await tokenClient.get(`/api/portfoliocomments/portfolios/${portfolioId}`);
    return commentData.data.data;
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
  getUserPortfolio: async (userId: number): Promise<GetUserPortfolio[]> => {
    // ! : sort 기능 추가 필요(아직 테스트하지 못함)
    const userPortfoliosData = await tokenClient.get(
      `${process.env.REACT_APP_API_URL}/portfolios/${userId}/portfolios?sortBy=createdAt&page=1&size=15`,
    );
    return userPortfoliosData.data.data;
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
  postUserComment: async ({ userId, writerId, content }: PostUserComment) => {
    return await tokenClient.post('/api/usercomments', {
      userId,
      writerId,
      content,
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
      console.log('post 후');
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

export { tokenClient };
