import { useState, useEffect } from 'react';

// util에 따로 빼서 사용해도 될듯
const increasePageView = async (portfolioId: number) => {
  try {
    // 백엔드의 API 호출
    const response = await fetch(`/api/pages/${portfolioId}/views`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    // API 호출 결과 확인
    if (!response.ok) {
      throw new Error('API 호출 실패');
    }
  } catch (error) {
    console.log(error);
  }
};

const hasViewedPageInSession = (portfolioId: number): boolean => {
  // 브라우저 세션 스토리지를 사용하여, 해당 페이지에 대한 조회 여부 저장
  const isViewed: string | null = sessionStorage.getItem(`page-${portfolioId}`);
  if (isViewed === 'true') {
    return true;
  }
  return false;
};

const markPageViewedInSession = (portfolioId: number): void => {
  // 브라우저 세션 스토리지를 사용하여, 해당 페이지에 대한 조회 여부 저장
  sessionStorage.setItem(`page-${portfolioId}`, 'true');
};

const useIncreasePageView = (portfolioId: number) => {
  const [isViewed, setIsViewed] = useState<boolean>(false);
  useEffect(() => {
    // 해당 페이지에 대한 조회 여부 확인
    const viewed = hasViewedPageInSession(portfolioId);
    setIsViewed(viewed);

    // 해당 페이지에 대한 조회 여부를 저장하지 않았을 경우, 조회수 API 호출 후 저장
    if (!viewed) {
      increasePageView(portfolioId);
      markPageViewedInSession(portfolioId);
    }
  }, [portfolioId]);

  // 조회수 업데이트 여부 반환
  return isViewed;
};
