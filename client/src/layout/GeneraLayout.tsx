import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppSelector } from '../hooks/reduxHook';

import Header from './header/Header';
import Footer from './footer/Footer';
import Main from './main/Main';

// 필요에 따라서 outlet을 사용할 수도 있음
const GeneraLayout = () => {
  type Theme = 'light' | 'dark';
  const theme = useAppSelector((state) => state.theme.theme);

  return (
    <>
      <Header />
      <Main>
        <Outlet />
      </Main>
      <Footer />
      <ToastContainer theme={theme as Theme} />
    </>
  );
};

export default GeneraLayout;
