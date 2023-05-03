// style-component
import * as S from './Header.style';

// react component
import Toggle from './Toggle';
import { YellowBtn } from '../../components/common/button.style';

// custom hooks
import { useRouter } from '../../hooks/useRouter';

function Header() {
  const { routeTo } = useRouter();

  const handleLogoClick = () => {
    routeTo('/');
  };

  const handleLoginClick = () => {
    routeTo('/Login');
  };
  return (
    <S.Header>
      <S.Logo onClick={handleLogoClick}>Logo</S.Logo>
      <S.ButtonContainer>
        <Toggle />
        <YellowBtn onClick={handleLoginClick}>Login</YellowBtn>
      </S.ButtonContainer>
    </S.Header>
  );
}

export default Header;
