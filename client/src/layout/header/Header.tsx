// style-component
import * as S from './Header.style';

// react component
import Toggle from './Toggle';
import { YellowBtn } from '../../components/common/Button.style';
import Hamburger from './Hamburger';
import NavLink from './NavLink';

// custom hooks
import { useRouter } from '../../hooks/useRouter';

// react hooks
import { useState } from 'react';

function Header() {
  const { routeTo } = useRouter();

  const handleLogoClick = () => {
    routeTo('/');
  };

  const handleLoginClick = () => {
    routeTo('/Login');
  };

  const [openNav, setOpenNav] = useState<boolean>(false);

  return (
    <S.Header>
      <S.Logo onClick={handleLogoClick}>Logo</S.Logo>
      {openNav && <NavLink setOpenNav={setOpenNav} />}
      <S.ButtonContainer>
        <Toggle />
        <YellowBtn onClick={handleLoginClick} className='header-login'>
          Login
        </YellowBtn>
        <S.SignUp className='header-signup'>회원가입</S.SignUp>
        <Hamburger openNav={openNav} setOpenNav={setOpenNav} />
      </S.ButtonContainer>
    </S.Header>
  );
}

export default Header;
