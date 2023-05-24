import * as S from './ShareSection.style';
import { useRouter } from '../../hooks/useRouter';

function ShareSection() {
  const { routeTo } = useRouter();
  const handleClick = () => {
    routeTo('/NewPortfolio');
  };

  return (
    <S.ShareSection>
      <S.SubTitle>지금 실물에서 포트폴리오를 공유하세요</S.SubTitle>
      <S.ShareButton onClick={handleClick}>공유하기</S.ShareButton>
    </S.ShareSection>
  );
}

export default ShareSection;
