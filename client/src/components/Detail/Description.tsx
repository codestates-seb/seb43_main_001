import * as S from './Description.style';

type DescriptionProps = {
  description: string;
};

// 상세 페이지 포트폴리오 상세 설명 컴포넌트
function Description({ description }: DescriptionProps) {
  return (
    <S.Container>
      <S.DescriptionTitle>🔍 Project Description</S.DescriptionTitle>
      <S.DescriptionText>{description}</S.DescriptionText>
    </S.Container>
  );
}

export default Description;
