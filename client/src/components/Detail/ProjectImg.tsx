import * as S from './ProjectImg.style';

type ProjectImgProps = {
  representativeImgUrl: string | null;
  views: number;
};

// 상세 페이지 포트폴리오 섬네일 이미지를 표시하는 컴포넌트
function ProjectImg({ representativeImgUrl, views }: ProjectImgProps) {
  return (
    <S.Wrapper>
      <S.Img>
        프로젝트 이미지가 있는 곳
        <S.IconSection>
          <div className='view-icon'>
            <S.ViewIcon />
            <span>{views}</span>
          </div>
          <div className='like-icon'>
            <S.LikeIcon />
            <span>추천수</span>
          </div>
        </S.IconSection>
      </S.Img>
    </S.Wrapper>
  );
}

export default ProjectImg;
