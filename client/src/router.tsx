import { createBrowserRouter } from 'react-router-dom';
import { Router as RemixRouter } from '@remix-run/router/dist/router';
import { lazy } from 'react';

// pages
const Home = lazy(() => import('./pages/Home'));
const Detail = lazy(() => import('./pages/Detail'));
const Login = lazy(() => import('./pages/Login'));
const User = lazy(() => import('./pages/User'));
const NewPortfolio = lazy(() => import('./pages/NewPortfolio'));
const EditPortfolio = lazy(() => import('./pages/EditPortfolio'));
const AddEmail = lazy(() => import('./pages/AddEmail'));
const NotFound = lazy(() => import('./pages/NotFound'));
const SignUp = lazy(() => import('./pages/SignUp'));
const About = lazy(() => import('./pages/About'));

// layout
import GeneralLayout from './layout/GeneraLayout';

// utils
import { checkAuth, preventLoginPage } from './utils/loaderAuth';

export const routers: RemixRouter = createBrowserRouter([
  {
    path: '/',
    element: <GeneralLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/Detail/:portfolioId',
        element: <Detail />,
      },
      {
        path: '/Login',
        element: <Login />,
        loader: preventLoginPage,
      },
      {
        path: '/User/:userId',
        element: <User />,
      },
      {
        path: '/NewPortfolio',
        element: <NewPortfolio />,
        loader: checkAuth,
      },
      {
        path: '/EditPortfolio/:portfolioId',
        element: <EditPortfolio />,
        loader: checkAuth,
      },
      // ? AddEmail 페이지는 어떻게 처리해야 하는지?
      {
        path: '/AddEmail',
        element: <AddEmail />,
        loader: preventLoginPage,
      },
      {
        path: '/SignUp',
        element: <SignUp />,
        loader: preventLoginPage,
      },
      {
        path: '/About',
        element: <About />,
      },
    ],
  },
]);
