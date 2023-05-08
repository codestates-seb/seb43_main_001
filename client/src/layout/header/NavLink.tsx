import * as S from './NavLink.style';

// custom hook
import { useRouter } from '../../hooks/useRouter';

type NavLinkProps = {
  setOpenNav: React.Dispatch<React.SetStateAction<boolean>>;
};

const NavLink = ({ setOpenNav }: NavLinkProps) => {
  const { routeTo } = useRouter();

  const handleLinkClick = () => {
    setOpenNav((pre) => !pre);
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
