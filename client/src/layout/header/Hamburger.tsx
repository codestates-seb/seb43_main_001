import * as S from './Hamburger.style';

type HamburgerProps = {
  openNav: boolean;
  setOpenNav: React.Dispatch<React.SetStateAction<boolean>>;
};

function Hamburger({ openNav, setOpenNav }: HamburgerProps) {
  const HandleMenuClick = () => {
    setOpenNav((pre) => !pre);
  };

  return <S.Hamburger onClick={HandleMenuClick}>{openNav ? <S.Cancel /> : <S.Menu />}</S.Hamburger>;
}

export default Hamburger;
