import { useState, useEffect, useRef } from 'react';
import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

import { useAppSelector, useAppDispatch } from '../hooks/reduxHook';
import { login } from '../store/slice/loginSlice';

import Banner from '../components/Home/Banner';
import Sort from '../components/Home/Sort';
import Search from '../components/Home/Search';
import Card from '../components/common/Card';
import ArrowUp from '../components/Home/ArrowUp';
import Loading from '../components/common/Loading';

import * as S from './Home.style';

type PortfolioList = {
  content: string;
  description: string;
  distributionLink: string;
  gitLink: string;
  name: string;
  portfolioId: string;
  title: string;
  updatedAt: number[];
  userId: number;
  views: number;
};

function Home() {
  const [orderName, setOrderName] = useState('latest');
  const dispatch = useAppDispatch();
  const isLogin = useAppSelector((state) => state.login.isLogin);

  // * 마운트 될때만 요청
  // * 쿼리스트링은 옵션에 따라 계속 바뀌어야 함

  // TODO: 이 부분 분리하기
  useEffect(() => {
    if (!isLogin) {
      // const currentURL = window.location.href;
      const currentURL = document.location.search;
      const params = new URLSearchParams(currentURL);

      const accessToken = params.get('access_token');
      const refreshToken = params.get('refresh_token');

      if (accessToken && refreshToken) {
        dispatch(login({ accessToken, refreshToken }));
      }
    }
  }, [isLogin, dispatch]);

  // const BASE_URL = 'http://43.201.157.191:8080';
  const BASE_URL = 'http://localhost:8000';

  // 데이터 패칭
  // TODO: 에러 처리 필요
  const { data, isError, isFetching, error, status, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ['portfolios'],
    ({ pageParam = 1 }) => {
      return axios.get(BASE_URL + `/portfolios?_page=${pageParam}&_limit=2`).then((res) => {
        return {
          // 실제 데이터
          portfolio: res.data,
          // 반환 값에 현재 페이지를 넘겨주자
          currentPage: pageParam,
          // 페이지가 마지막인지 알려주는 서버에서 넘겨준 true/false 값
          isLast: res.data.at(-1).isLast,
        };
      });
    },
    {
      getNextPageParam: (lastPage, pages) => {
        if (!lastPage.isLast) {
          return lastPage.currentPage + 1;
        }
        return undefined;
      },
    },
  );

  const targetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '100px',
      threshold: 0.3,
    };

    const handleIntersect: IntersectionObserverCallback = (
      entries: IntersectionObserverEntry[],
      observer: IntersectionObserver,
    ) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !isFetching && hasNextPage) {
          fetchNextPage();
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
  }, [fetchNextPage, hasNextPage, isFetching]);

  return (
    <S.Container>
      <Banner />
      <Sort setOrderName={setOrderName} />
      <S.ContentWrapper>
        <Search />
        <S.CardWrapper>
          {/* //? data가 undefined라면 에러 발생하는지....? */}
          {data?.pages.map((page) =>
            page.portfolio.map((item: PortfolioList) => (
              <Card
                key={item.portfolioId}
                portfolioId={item.portfolioId}
                title={item.title}
                description={item.description}
                views={item.views}
                userId={item.userId}
                name={item.name}
              />
            )),
          )}
          {isFetching && <Loading />}
          {isError && <div>에러 발생</div>}
          {!hasNextPage && <div>여기가 마지막이에요.</div>}
          <S.Target ref={targetRef} />
        </S.CardWrapper>
        <ArrowUp />
      </S.ContentWrapper>
    </S.Container>
  );
}

export default Home;
