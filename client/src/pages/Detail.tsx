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

// react-router-dom
import { useParams } from 'react-router-dom';

// common component
import Loading from '../components/common/Loading';

function Detail() {
  const { portfolioId } = useParams();

  const { getPortfolioLoading, getPortfolioError, PortfolioInfo, ErrorInfo } = useGetPortfolio(
    Number(portfolioId),
  );

  // if (getPortfolioLoading) {
  //   return (
  //     <S.Container>
  //       <Loading />
  //     </S.Container>
  //   );
  // }
  // // 에러 처리를  다시 고민 해보자 (굳이 없어도 될듯)
  // if (getPortfolioError) {
  //   console.log('error 발생', ErrorInfo);
  //   return (
  //     <S.Container>
  //       <Loading />
  //     </S.Container>
  //   );
  // }

  return (
    <S.Container>
      {/* {PortfolioInfo && (
        <>
          <LikeBtn />
          <DetailTitle
          // title={PortfolioInfo.title}
          // name={PortfolioInfo.name}
          // gitLink={PortfolioInfo.gitLink}
          // distributionLink={PortfolioInfo.distributionLink}
          />
          <ProjectImg />
          <Description />
          <ProjectContent />
          <Comment />
        </>
      )} */}
      <LikeBtn />
      <DetailTitle
      // title={PortfolioInfo.title}
      // name={PortfolioInfo.name}
      // gitLink={PortfolioInfo.gitLink}
      // distributionLink={PortfolioInfo.distributionLink}
      />
      <ProjectImg />
      <Description />
      <ProjectContent />
      <Comment />
    </S.Container>
  );
}

export default Detail;
