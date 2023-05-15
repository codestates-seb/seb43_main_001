import { useState } from 'react';
import * as S from './Sort.style';

type SortProps = {
  setOrderName?: (orderName: string) => void;
};

function Sort({ setOrderName }: SortProps) {
  const [selectedButton, setSelectedButton] = useState('최신순');

  // TODO: API 명세서 받으면 수정하기
  const getOrderName = (buttonName: string) => {
    switch (buttonName) {
      case '최신순':
        return 'latest';
      case '추천순':
        return 'recommend';
      case '조회순':
        return 'views';
      default:
        return 'latest';
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const buttonName = e.currentTarget.innerText;
    setSelectedButton(buttonName);

    const orderType = getOrderName(buttonName);
    if (setOrderName) {
      setOrderName(orderType);
    }
  };

  return (
    <S.SortWrapper>
      <S.SortButton
        type='button'
        className={selectedButton === '최신순' ? 'select' : ''}
        onClick={handleClick}
      >
        최신순
      </S.SortButton>
      <S.SortButton
        type='button'
        className={selectedButton === '추천순' ? 'select' : ''}
        onClick={handleClick}
      >
        추천순
      </S.SortButton>
      <S.SortButton
        type='button'
        className={selectedButton === '조회순' ? 'select' : ''}
        onClick={handleClick}
      >
        조회순
      </S.SortButton>
    </S.SortWrapper>
  );
}

export default Sort;
