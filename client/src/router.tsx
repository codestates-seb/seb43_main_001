import { createBrowserRouter } from 'react-router-dom';
import { Router as RemixRouter } from '@remix-run/router/dist/router';

// pages
import Home from './pages/Home';
import Detail from './pages/Detail';
import Login from './pages/Login';
import User from './pages/User';
import NewPortfolio from './pages/NewPortfolio';
import EditPortfolio from './pages/EditPortfolio';
import AddEmail from './pages/AddEmail';
import NotFound from './pages/NotFound';
import SignUp from './pages/SignUp';
import About from './pages/About';

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
