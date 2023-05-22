import { useState, useRef } from 'react';

import { useGetPortfolioList } from '../hooks/useGetPortfolioList';
import { useAuth } from '../hooks/useAuth';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';

import Banner from '../components/Home/Banner';
import Sort from '../components/Home/Sort';
import Search from '../components/Home/Search';
import ArrowUp from '../components/Home/ArrowUp';
import Card from '../components/common/Card';
import Loading from '../components/common/Loading';

import * as S from './Home.style';

import { GetPortfolio, SortOption } from '../types/index';

function Home() {
  const [sortOption, setSortOption] = useState<SortOption>('createdAt');
  const [category, setCategory] = useState('userName');
  const [value, setValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [searchCategory, setSearchCategory] = useState('');

  const targetRef = useRef<HTMLDivElement | null>(null);

  const {
    PortfolioData,
    isPortfoliosError,
    isPortfolioFetching,
    ErrorInfo,
    portfolioStatus,
    fetchNextPortfolio,
    hasNextPortfolio,
  } = useGetPortfolioList(sortOption, searchCategory, searchValue);

  useAuth();
  useInfiniteScroll({
    targetRef,
    isPortfoliosError,
    isPortfolioFetching,
    hasNextPortfolio,
    fetchNextPortfolio,
  });

  const handleSearch = () => {
    setSearchValue(value);
    setSearchCategory(category);
  };

  return (
    <S.Container>
      <Banner />
      <Sort setSortOption={setSortOption} />
      <S.ContentWrapper>
        <Search setValue={setValue} setCategory={setCategory} handleSearch={handleSearch} />
        {/* TODO: 수정 필요함 */}
        {isPortfoliosError || isPortfolioFetching
          ? null
          : searchValue && (
              <p>
                총 <strong>{PortfolioData?.pages[0].pageInfo.totalElements}개</strong>의
                포트폴리오를 찾았습니다.
              </p>
            )}
        <S.CardWrapper>
          {PortfolioData
            ? PortfolioData.pages.map((page) =>
                page.data.map((item: GetPortfolio) => (
                  <Card
                    key={item.portfolioId}
                    portfolioId={item.portfolioId}
                    title={item.title}
                    description={item.description}
                    views={item.viewCount}
                    userId={item.userId}
                    name={item.name}
                    skills={item.skills}
                    representativeImgUrl={item.representativeImgUrl}
                  />
                )),
              )
            : null}
          <S.Target ref={targetRef} />
        </S.CardWrapper>
        {/* TODO: 수정 필요함*/}
        {hasNextPortfolio && isPortfolioFetching && <Loading />}
        {!isPortfolioFetching && !isPortfoliosError && !hasNextPortfolio && (
          <div>여기가 마지막이에요.</div>
        )}
        {PortfolioData?.pages.length === 0 && <div>포트폴리오가 없습니다.</div>}
        {!hasNextPortfolio && isPortfolioFetching && <Loading />}
        {ErrorInfo?.response?.status === 404 && <div>검색 결과가 없습니다.</div>}
        <ArrowUp />
      </S.ContentWrapper>
    </S.Container>
  );
}

export default Home;
