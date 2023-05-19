import * as S from './Portfolio.style';
import Card from '../common/Card';
import Sort from '../Home/Sort';
import React from 'react';
import { useGetUserPortfolios } from '../../hooks/useGetUserPortfolios';

type IdProps = {
  userId: number;
};
const Portfolio: React.FC<IdProps> = ({ userId }) => {
  // ! : 실제 테스트에서는 0 대신 id값 넣을 것
  const { UserPortfolios } = useGetUserPortfolios(userId);
  return (
    <>
      {UserPortfolios && (
        <>
          <Sort />
          <S.PortfolioContainer>
            {UserPortfolios.map((ele) => (
              <Card
                key={ele.portfolioId}
                portfolioId={ele.portfolioId}
                description={ele.description}
                title={ele.title}
                views={ele.views}
              />
            ))}
          </S.PortfolioContainer>
        </>
      )}
    </>
  );
};

export default Portfolio;
