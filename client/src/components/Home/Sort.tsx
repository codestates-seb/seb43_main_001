import { useState } from 'react';
import * as S from './Sort.style';

function Sort() {
  const [selectedButton, setSelectedButton] = useState('최신순');

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const buttonName = e.currentTarget.innerText;
    setSelectedButton(buttonName);
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