// styled-component
import * as S from './Header.style';

// react component
import Toggle from './Toggle';
import { YellowBtn } from '../../components/common/Button.style';
import Hamburger from './Hamburger';
import NavLink from './NavLink';

// custom hooks
import { useRouter } from '../../hooks/useRouter';

// react hooks
import { useState, useEffect } from 'react';

// redux
import { useAppSelector, useAppDispatch } from '../../hooks/reduxHook';
import { logout } from '../../store/slice/loginSlice';

// util
import { getUserIdFromAccessToken } from '../../utils/getUserIdFromAccessToken';

// api
import { UserProfileAPI } from '../../api/client';

// logo
import { Logo } from '../../components/common/icons';

// *: header 컴포넌트
function Header() {
  const { routeTo } = useRouter();
  const { getUserProfile } = UserProfileAPI;

  const [imgPath, setImgPath] = useState<string>('');
  const isLogin = useAppSelector((state) => state.login.isLogin);
  const token = localStorage.getItem('accessToken');
  const dispatch = useAppDispatch();
  const userId = getUserIdFromAccessToken(isLogin, token);

  useEffect(() => {
    if (isLogin) {
      getUserProfile(userId!)
        .then((response) => {
          setImgPath(response.profileImg);
        })
        .catch((error) => console.log(error));
    }
  }, [isLogin]);

  const handleLogoClick = () => {
    routeTo('/');
  };

  const handleLoginClick = () => {
    routeTo('/Login');
  };

  const handleLogoutClick = () => {
    dispatch(logout(null));
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    routeTo('/');
  };

  const [openNav, setOpenNav] = useState<boolean>(false);

  const handleUserOnClick = () => {
    routeTo(`/User/${userId}`);
  };

  return (
    <S.Header>
      <S.Logo onClick={handleLogoClick}>
        <Logo />
      </S.Logo>
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
