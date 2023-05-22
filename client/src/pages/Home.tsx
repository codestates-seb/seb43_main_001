import { useState, useEffect, useRef } from 'react';

import { useAppSelector, useAppDispatch } from '../hooks/reduxHook';
import { useGetPortfolioList } from '../hooks/useGetPortfolioList';
import { login } from '../store/slice/loginSlice';

import Banner from '../components/Home/Banner';
import Sort from '../components/Home/Sort';
import Search from '../components/Home/Search';
import Card from '../components/common/Card';
import ArrowUp from '../components/Home/ArrowUp';
import Loading from '../components/common/Loading';

import * as S from './Home.style';

import { GetPortfolio, SortOption } from '../types/index';

function Home() {
  const dispatch = useAppDispatch();
  const isLogin = useAppSelector((state) => state.login.isLogin);

  const [sortOption, setSortOption] = useState<SortOption>('createdAt');
  const [category, setCategory] = useState('userName');
  const [value, setValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [searchCategory, setSearchCategory] = useState('');

  // * 로그인 상태와 토큰 처리
  useEffect(() => {
    if (!isLogin) {
      const currentURL = document.location.search;
      const params = new URLSearchParams(currentURL);

      const accessToken = params.get('access_token');
      const refreshToken = params.get('refresh_token');

      if (accessToken && refreshToken) {
        dispatch(login({ accessToken, refreshToken }));
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
      }
    }
  }, []);

  const handleSearch = () => {
    setSearchValue(value);
    setSearchCategory(category);
  };

  const {
    PortfolioData,
    isPortfoliosError,
    isPortfolioFetching,
    ErrorInfo,
    portfolioStatus,
    fetchNextPortfolio,
    hasNextPortfolio,
  } = useGetPortfolioList(sortOption, searchCategory, searchValue);

  const targetRef = useRef<HTMLDivElement | null>(null);

  // * 무한스크롤
  useEffect(() => {
    const options = {
      root: null, // * viewport
      rootMargin: '100px',
      threshold: 0.3,
    };

    const handleIntersect: IntersectionObserverCallback = (
      entries: IntersectionObserverEntry[],
    ) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !isPortfoliosError && hasNextPortfolio) {
          fetchNextPortfolio();
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
  }, [fetchNextPortfolio, hasNextPortfolio, isPortfolioFetching]);

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
