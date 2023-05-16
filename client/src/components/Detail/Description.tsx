import * as S from './Description.style';

// custom hook
import { useGetPortfolio } from '../../hooks/useGetPortfolio';

// 상세 페이지 포트폴리오 상세 설명 컴포넌트
function Description() {
  // !: userId를 뽑아서 사용해야 한다 여기에선 Description만 추가된다.
  const { getPortfolioLoading, getPortfolioError, PortfolioInfo } = useGetPortfolio('1');

  return (
    <S.Container>
      <S.DescriptionTitle>🔍 Project Overview</S.DescriptionTitle>
      <S.DescriptionText>
        Asana는 명상이나 집중을 위해 자신이 주로 듣는 음악 링크를 저장해 플레이리스트를 보여주고,
        플레이 할 수 있는 url 링크 저장소 서비스입니다. 이번 프로젝트는 TypeScript와 GraphQL,
        next.js을 공부하면서, 간단한 프로젝트를 하나 만들어 보아야겠다 다짐을 하며 시작하게 된
        작업입니다. 사용자가 회원가입을하고 로그인을 하면 youtube나 sound cloud 등에서 명상음악이나
        개인이 마음에드는 음악 등의 링크를 iframe url을 입력해 생성하면, streams 페이지에서 자신이
        등록한 음악을 감상 할 수 있습니다. 생성한 영상링크는 삭제와 수정이 가능합니다.
      </S.DescriptionText>
    </S.Container>
  );
}

export default Description;
