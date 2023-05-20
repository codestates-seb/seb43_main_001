import * as S from './ProjectContent.style';

// 상세 페이지 포트폴리오 프로젝트 내용을 담는 컴포넌트
type ProjectContentProps = {
  content: string;
};
function ProjectContent({ content }: ProjectContentProps) {
  return <S.Container dangerouslySetInnerHTML={{ __html: content }}></S.Container>;
}

export default ProjectContent;
