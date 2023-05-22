import * as S from './ProjectImg.style';

type ProjectImgProps = {
  representativeImgUrl: string | null;
  viewCount: number;
  countLikes: number;
};

// 상세 페이지 포트폴리오 섬네일 이미지를 표시하는 컴포넌트
function ProjectImg({ representativeImgUrl, viewCount, countLikes }: ProjectImgProps) {
  return (
    <S.Wrapper>
      <S.Img>
        프로젝트 이미지가 있는 곳
        <S.IconSection>
          <div className='view-icon'>
            <S.ViewIcon />
            <span>{viewCount}</span>
          </div>
          <div className='like-icon'>
            <S.LikeIcon />
            <span>{countLikes}</span>
          </div>
        </S.IconSection>
      </S.Img>
    </S.Wrapper>
  );
}

export default ProjectImg;
