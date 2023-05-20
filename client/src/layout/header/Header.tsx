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

// redux
import { useAppSelector, useAppDispatch } from '../../hooks/reduxHook';
import { logout } from '../../store/slice/loginSlice';

// util
import { getUserIdFromAccessToken } from '../../utils/getUserIdFromAccessToken';

// *: header 컴포넌트
function Header() {
  const { routeTo } = useRouter();

  const isLogin = useAppSelector((state) => state.login.isLogin);
  const token = localStorage.getItem('accessToken');
  const dispatch = useAppDispatch();
  const userId = getUserIdFromAccessToken(isLogin, token);
  const handleLogoClick = () => {
    routeTo('/');
  };

  const handleLoginClick = () => {
    routeTo('/Login');
  };

  const handleLogoutClick = () => {
    dispatch(logout(null));
  };

  const [openNav, setOpenNav] = useState<boolean>(false);

  const handleUserOnClick = () => {
    routeTo(`/User/${userId}`);
  };

  const imgPath =
    'https://images.unsplash.com/photo-1488161628813-04466f872be2?crop=entropy&cs=srgb&fm=jpg&ixid=Mnw3MjAxN3wwfDF8c2VhcmNofDl8fHBlb3BsZXxlbnwwfHx8fDE2ODMwODA2MDQ&ixlib=rb-4.0.3&q=85&q=85&fmt=jpg&crop=entropy&cs=tinysrgb&w=450';

  return (
    <S.Header>
      <S.Logo onClick={handleLogoClick}>Logo</S.Logo>
      {openNav && <NavLink setOpenNav={setOpenNav} />}
      <S.ButtonContainer>
        <Toggle />
        {isLogin ? <S.UserImg src={imgPath} onClick={handleUserOnClick} /> : null}
        <YellowBtn
          onClick={isLogin ? handleLogoutClick : handleLoginClick}
          className='header-login'
        >
          {isLogin ? 'Logout' : 'Login'}
        </YellowBtn>
        {isLogin ? null : (
          <S.SignUp className='header-signup' onClick={() => routeTo('/SignUp')}>
            회원가입
          </S.SignUp>
        )}
        <Hamburger openNav={openNav} setOpenNav={setOpenNav} />
      </S.ButtonContainer>
    </S.Header>
  );
}

export default Header;
