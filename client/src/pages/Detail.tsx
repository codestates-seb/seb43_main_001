import * as S from './Detail.style';

// react component
import DetailTitle from '../components/Detail/DetailTitle';
import ProjectImg from '../components/Detail/ProjectImg';
import Description from '../components/Detail/Description';
import ProjectContent from '../components/Detail/ProjectContent';
import Comment from '../components/Detail/Comment';
import LikeBtn from '../components/Detail/LikeBtn';

// custom Hooks
import { useGetPortfolio } from '../hooks/useGetPortfolio';
import { IncreasePageView } from '../utils/IncreasePageView';

// react-router-dom
import { useParams } from 'react-router-dom';

// redux
import { useAppSelector } from '../hooks/reduxHook';

function Detail() {
  const { portfolioId } = useParams();
  const { getPortfolioLoading, PortfolioInfo } = useGetPortfolio(Number(portfolioId));
  const isLogin = useAppSelector((state) => state.login.isLogin);
  IncreasePageView(Number(portfolioId));

  const year = PortfolioInfo?.createdAt[0];
  const month = PortfolioInfo?.createdAt[1];
  const day = PortfolioInfo?.createdAt[2];

  if (getPortfolioLoading) {
    return (
      <S.LoadingContainer>
        <S.LoadingComponent />
      </S.LoadingContainer>
    );
  }
  return (
    <S.Container>
      {PortfolioInfo && (
        <>
          {isLogin && (
            <LikeBtn likes={PortfolioInfo.likes} portfolioId={PortfolioInfo.portfolioId} />
          )}
          <DetailTitle
            profileImg={PortfolioInfo.profileImg}
            auth={PortfolioInfo.auth}
            userId={PortfolioInfo.userId}
            title={PortfolioInfo.title}
            name={PortfolioInfo.name}
            gitLink={PortfolioInfo.gitLink}
            distributionLink={PortfolioInfo.distributionLink}
            skills={PortfolioInfo.skills}
            portfolioId={PortfolioInfo.portfolioId}
          />
          {`작성일: ${year}.${month}.${day}`}
          <ProjectImg
            representativeImgUrl={PortfolioInfo.representativeImgUrl}
            viewCount={PortfolioInfo.viewCount}
            likesCount={PortfolioInfo.likesCount}
          />
          <Description description={PortfolioInfo.description} />
          <ProjectContent content={PortfolioInfo.content} />
          <Comment />
        </>
      )}
    </S.Container>
  );
}

export default Detail;
