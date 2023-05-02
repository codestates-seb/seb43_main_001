import { createBrowserRouter } from 'react-router-dom';
import { Router as RemixRouter } from '@remix-run/router/dist/router';

// import GeneralLayout from './'

// pages
import Home from './pages/Home';
import Detail from './pages/Detail';
import Login from './pages/Login';
import User from './pages/User';

// layout
import GeneralLayout from './layout/GeneraLayout';

interface RouterElement {
  id: number; // 페이지 아이디 (반복문용 고유값)
  path: string; // 페이지 경로
  label: string; // 사이드바에 표시할 페이지 이름
  element: React.ReactNode; // 페이지 엘리먼트
  withAuth?: boolean; // 인증이 필요한 페이지 여부
}

const routerData: RouterElement[] = [
  {
    id: 0,
    path: '/',
    label: 'Home',
    element: <Home />,
    withAuth: false,
  },
  {
    id: 1,
    path: '/Detail',
    label: 'Detail',
    element: <Detail />,
    withAuth: false,
  },
  {
    id: 2,
    path: '/Login',
    label: 'Login',
    element: <Login />,
    withAuth: false,
  },
  {
    id: 3,
    path: '/User',
    label: 'User',
    element: <User />,
    withAuth: false,
  },
];

export const routers: RemixRouter = createBrowserRouter(
  // TODO 3-1: 인증이 필요한 페이지는 GeneralLayout 으로 감싸기
  // GeneralLayout 에는 페이지 컴포넌트를 children 으로 전달
  routerData.map((router) => {
    if (router.withAuth) {
      return {
        path: router.path,
        element: <GeneralLayout>{router.element}</GeneralLayout>,
      };
    } else {
      return {
        path: router.path,
        element: <GeneralLayout>{router.element}</GeneralLayout>,
      };
    }
  }),
);
