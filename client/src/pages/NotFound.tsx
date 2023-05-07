import { useRouter } from '../hooks/useRouter';
import * as S from './NotFound.style';

function NotFound() {
  const { routeTo } = useRouter();

  const handleButtonClick = () => {
    routeTo('/');
  };

  return (
    <S.Container>
      <h1>404</h1>
      <h2>Page not found.</h2>
      <p>페이지를 찾을 수 없습니다.</p>
      <S.HomeButton onClick={handleButtonClick}>홈으로</S.HomeButton>
    </S.Container>
  );
}

export default NotFound;
