import * as S from './LandingSection.style';

function LandingSection() {
  return (
    <S.LandingSection>
      <S.Title>
        실력을 물어보자!
        <br /> 개발자들의 포트폴리오 공유 플랫폼, 실물
      </S.Title>
      <S.Description>
        실물&#40;Silmul&#41;은 개발자들을 위한 소통하는 포트폴리오 공유 플랫폼입니다.
        실물&#40;Silmul&#41;에서는 프로젝트, 기술 및 경험을 포함하여 포트폴리오에 대한 세부 정보를
        추가할 수 있습니다. 포트폴리오를 검색하고 다른 개발자의 작업을 확인해보세요!
      </S.Description>
      <S.BackgroundImg>
        <img src='./assets/image/Meeting.svg' alt='배경 일러스트' />
      </S.BackgroundImg>
    </S.LandingSection>
  );
}

export default LandingSection;
