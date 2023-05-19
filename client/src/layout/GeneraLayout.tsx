import { Outlet } from 'react-router-dom';

import Header from './header/Header';
import Footer from './footer/Footer';
import Main from './main/Main';

// 필요에 따라서 outlet을 사용할 수도 있음
const GeneraLayout = () => {
  return (
    <>
      <Header />
      <Main>
        <Outlet />
      </Main>
      <Footer />
    </>
  );
};

export default GeneraLayout;
