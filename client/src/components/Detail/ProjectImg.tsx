import * as S from './ProjectImg.style';

type ProjectImgProps = {
  representativeImgUrl: string;
};

// 상세 페이지 포트폴리오 섬네일 이미지를 표시하는 컴포넌트
function ProjectImg({ representativeImgUrl }: ProjectImgProps) {
  return (
    <S.Wrapper>
      <S.Img src={representativeImgUrl} />
    </S.Wrapper>
  );
}

export default ProjectImg;
