import Header from './header/Header';
import Footer from './footer/Footer';
import Main from './main/Main';
interface GeneralLayoutProps {
  children: React.ReactNode;
}
// 필요에 따라서 outlet을 사용할 수도 있음
const GeneraLayout: React.FC<GeneralLayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </>
  );
};

export default GeneraLayout;
