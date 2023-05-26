import * as S from './Portfolio.style';
import Card from '../common/Card';
import Sort from '../Home/Sort';
import React, { useRef, useState } from 'react';
import { useGetUserPortfolios } from '../../hooks/useGetUserPortfolios';
import Loading from '../common/Loading';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';

type IdProps = {
  userId: number;
};
const Portfolio: React.FC<IdProps> = ({ userId }) => {
  // ! : 실제 테스트에서는 0 대신 id값 넣을 것
  const [orderName, setOrderName] = useState('createdAt');
  const {
    UserPortfolios,
    getUserPortfoliosError,
    getUserPortfoliosFetching,
    ErrorInfo,
    userPortfoliosStatus,
    fetchNextUserPortfolios,
    hasNextUserPortfolios,
    getUserPortfolioLoading,
  } = useGetUserPortfolios(userId, '6', orderName);

  const targetRef = useRef<HTMLDivElement | null>(null);

  useInfiniteScroll({
    targetRef,
    isPortfoliosError: getUserPortfoliosError,
    isPortfolioFetching: getUserPortfoliosFetching,
    hasNextPortfolio: hasNextUserPortfolios,
    fetchNextPortfolio: fetchNextUserPortfolios,
  });

  if (getUserPortfolioLoading) {
    return (
      <>
        <Sort setSortOption={setOrderName} />
        <S.ErrorContainer>
          <Loading />
        </S.ErrorContainer>
      </>
    );
  }

  return (
    <>
      <Sort setSortOption={setOrderName} />
      {UserPortfolios && (
        <>
          {UserPortfolios.pages[0].data.length === 0 ? (
            <S.ErrorContainer>현재 작성된 포트폴리오가 없습니다.</S.ErrorContainer>
          ) : (
            <S.PortfolioContainer>
              {UserPortfolios.pages.map((page) =>
                page.data.map((data) => (
                  <Card
                    key={data.portfolioId}
                    representativeImgUrl={data.representativeImgUrl}
                    portfolioId={data.portfolioId}
                    description={data.description}
                    title={data.title}
                    views={data.viewCount}
                    skills={data.skills}
                    likes={data.likesCount}
                  />
                )),
              )}
              <S.Target ref={targetRef} />
              {/* {!getUserPortfoliosFetching && !getUserPortfoliosError && !hasNextUserPortfolios && (
                <p>마지막 게시글입니다.</p>
              )} */}
            </S.PortfolioContainer>
          )}
        </>
      )}
    </>
  );
};

export default Portfolio;
