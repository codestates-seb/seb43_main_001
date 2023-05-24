import { useState } from 'react';
import * as S from './Sort.style';
import { SortOption } from '../../types/index';

type SortProps = {
  setSortOption?: (sortOption: SortOption) => void;
};

function Sort({ setSortOption }: SortProps) {
  const [selectedButton, setSelectedButton] = useState('최신순');

  // TODO: API 명세서 받으면 수정하기
  const getSortOption = (buttonName: string) => {
    switch (buttonName) {
      case '최신순':
        return 'createdAt';
      case '추천순':
        return 'likes'; // ! 구현중
      case '조회순':
        return 'views';
      default:
        return 'createdAt';
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const buttonName = e.currentTarget.innerText;
    setSelectedButton(buttonName);

    const sortType = getSortOption(buttonName);
    if (setSortOption) {
      setSortOption(sortType);
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
