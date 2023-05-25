import * as S from './Portfolio.style';
import Card from '../common/Card';
import Sort from '../Home/Sort';
import React, { useEffect, useRef, useState } from 'react';
import { useGetUserPortfolios } from '../../hooks/useGetUserPortfolios';
import Loading from '../common/Loading';

type IdProps = {
  userId: number;
};
const Portfolio: React.FC<IdProps> = ({ userId }) => {
  // ! : 실제 테스트에서는 0 대신 id값 넣을 것
  const [orderName, setOrderName] = useState('createdAt');
  const {
    UserPortfolios,
    getUserPortfoliosError,
    fetchNextUserPortfolios,
    hasNextUserPortfolios,
    getUserPortfoliosFetched,
    getUserPortfoliosLoading,
  } = useGetUserPortfolios(userId, '6', `${orderName === 'recommend' ? 'likes' : orderName}`);

  const targetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '100px',
      threshold: 0.3,
    };

    const handleIntersect: IntersectionObserverCallback = (
      entries: IntersectionObserverEntry[],
    ) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !getUserPortfoliosError && hasNextUserPortfolios) {
          fetchNextUserPortfolios();
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, options);

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
    };
  }, [fetchNextUserPortfolios, hasNextUserPortfolios, getUserPortfoliosFetched]);

  if (getUserPortfoliosLoading) {
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
      {UserPortfolios && (
        <>
          <Sort setSortOption={setOrderName} />
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
            </S.PortfolioContainer>
          )}
        </>
      )}
    </>
  );
};

export default Portfolio;
