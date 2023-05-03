import * as S from './NavLink.style';

// custom hook
import { useRouter } from '../../hooks/useRouter';

const NavLink = () => {
  const { routeTo } = useRouter();

  const handleLinkClick = () => {
    routeTo('/Login');
  };

  return (
    <S.NavDropDonwMenu>
      <S.LinkList>
        <S.Link onClick={handleLinkClick}>Login</S.Link>
        <S.Link>SignUp</S.Link>
      </S.LinkList>
    </S.NavDropDonwMenu>
  );
};

export default NavLink;
