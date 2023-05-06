import { useState } from 'react';
import * as S from './Sort.style';

function Sort() {
  const [selectedButton, setSelectedButton] = useState('');

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const buttonName = e.currentTarget.innerText;
    setSelectedButton(buttonName);
  };

  return (
    <S.SortWrapper>
      <S.SortButton className={selectedButton === '최신순' ? 'select' : ''} onClick={handleClick}>
        최신순
      </S.SortButton>
      <S.SortButton className={selectedButton === '추천순' ? 'select' : ''} onClick={handleClick}>
        추천순
      </S.SortButton>
      <S.SortButton className={selectedButton === '조회순' ? 'select' : ''} onClick={handleClick}>
        조회순
      </S.SortButton>
    </S.SortWrapper>
  );
}

export default Sort;
