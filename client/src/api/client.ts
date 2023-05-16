// axios
import axios from 'axios';

// redux
import { useAppSelector, useAppDispatch } from '../hooks/reduxHook';

// util
import { getNewAccessToken } from '../utils/getAccessToken';

// types
import { GetPortfolioCommentById, GetPortfolio, PostPortfolioComment } from '../types/index';

// redux
import { setAccessToken } from '../store/slice/loginSlice';

// ? 변수 선언 말고 바로 넣는 게 보안상 더 좋으려나?

const REFRESH_URL = ''; // refresh URL을 새롭게 추가를 해야 한다.

const noneTokenClient = axios.create({ baseURL: process.env.REACT_APP_API_URL });
const tokenClient = axios.create({ baseURL: process.env.REACT_APP_API_URL });

// *: 요청하는 상태에 따라서 무조건 토큰을 담아서 보낸다.
tokenClient.interceptors.request.use((config) => {
  // * :요청 헤더가 있으면 기존의 것을 반환하고 없으면 아래 처럼 새롭게 지정해준다.
  if (!config.headers) return config;

  if (config.url === REFRESH_URL) {
    config.headers.Authorization = `${useAppSelector((state) => state.login.refreshToken)}`;
  } else {
    config.headers.Authorization = `${useAppSelector((state) => state.login.accessToken)}`;
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

    // originalRequest._retry은 재시도 여부를 나타낸다(계속 요청하는 loop를 방지하기 위해)
    if (error.response.status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // refreshToken을 이용해 새로운 accessToken 발급
        const { accessToken } = await getNewAccessToken();

        // 새롭게 발급 받은 accessToken을 로컬 스토리지에 저장하기
        const dispatch = useAppDispatch();

        dispatch(setAccessToken(accessToken));

        // *:새롭게 받은 accessToken을 다시 기존의 요청 헤더 권한에 부여
        originalRequest.headers.authorization = `${accessToken}`;

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

// *: token을 사용하지 않는 response 설정
noneTokenClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const errorResponse = {
      ...error.response.data,
    };

    return Promise.reject(errorResponse);
  },
);

export const userAPI = {};

export const PortfolioAPI = {
  getPortfolio: async (userId: string): Promise<GetPortfolio> => {
    const PortfolioData = await tokenClient.get(
      `${process.env.REACT_APP_API_URL}/portfolios/${userId}`,
    );
    return PortfolioData.data;
  },
};

export const PortfolioCommentAPI = {
  getPortfolioComment: async (portfolioId: number): Promise<GetPortfolioCommentById[]> => {
    const commentData = await tokenClient.get(
      `${process.env.REACT_APP_API_URL}/api/portfoliocomments/portfolios/${portfolioId}`,
    );
    return commentData.data.data;
  },
  postPortfolioComment: async ({ userId, portfolioId, content }: PostPortfolioComment) => {
    return await tokenClient.post(`${process.env.REACT_APP_API_URL}/api/portfoliocomments`, {
      userId,
      portfolioId,
      content,
    });
  },
};

export const UserCommentAPI = {};

export { tokenClient, noneTokenClient };
