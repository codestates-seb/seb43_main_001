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

  if (getUserPortfoliosError) {
    return (
      <>
        <Sort setSortOption={setOrderName} />
        <S.ErrorContainer>현재 작성된 포트폴리오가 없습니다.</S.ErrorContainer>
      </>
    );
  }

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
      <Sort setSortOption={setOrderName} />
      <S.PortfolioContainer>
        {UserPortfolios &&
          UserPortfolios.pages.map((page) =>
            page.data.map((ele) => (
              <Card
                key={ele.portfolioId}
                portfolioId={ele.portfolioId}
                description={ele.description}
                title={ele.title}
                views={ele.viewCount}
                skills={ele.skills}
              />
            )),
          )}
        <S.Target ref={targetRef} />
      </S.PortfolioContainer>
    </>
  );
};

export default Portfolio;
