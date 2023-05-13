import * as S from './NavLink.style';

// custom hook
import { useRouter } from '../../hooks/useRouter';

// redux
import { logout } from '../../store/slice/loginSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHook';

type NavLinkProps = {
  setOpenNav: React.Dispatch<React.SetStateAction<boolean>>;
};

const NavLink = ({ setOpenNav }: NavLinkProps) => {
  const { routeTo } = useRouter();

  const isLogin = useAppSelector((state) => state.login.isLogin);

  const dispatch = useAppDispatch();

  const handleLoginClick = () => {
    setOpenNav((pre) => !pre);
    routeTo('/Login');
  };

  const handleLogoutClick = () => {
    dispatch(logout(null));
  };

  return (
    <S.NavDropDonwMenu>
      <S.LinkList>
        <S.Link onClick={isLogin ? handleLogoutClick : handleLoginClick}>
          {isLogin ? 'Logout' : 'Login'}
        </S.Link>
        {isLogin ? null : <S.Link>SignUp</S.Link>}
      </S.LinkList>
    </S.NavDropDonwMenu>
  );
};

export default NavLink;
