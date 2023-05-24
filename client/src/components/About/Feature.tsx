import * as S from './Feature.style';

type FeatureProps = {
  featureTitle: string;
  description: string;
  children: React.ReactNode;
};

function Feature({ featureTitle, description, children }: FeatureProps) {
  return (
    <S.Wrapper>
      <S.IconWrapper>{children}</S.IconWrapper>
      <S.FeatureContent>
        <S.FeatureTitle>{featureTitle}</S.FeatureTitle>
        <S.Description>{description}</S.Description>
      </S.FeatureContent>
    </S.Wrapper>
  );
}

export default Feature;
