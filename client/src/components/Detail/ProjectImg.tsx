import * as S from './ProjectImg.style';

function ProjectImg() {
  return (
    <S.Wrapper>
      <S.Img>
        프로젝트 이미지가 있는 곳
        <S.IconSection>
          <div className='view-icon'>
            <S.ViewIcon />
            <span>조회수</span>
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
