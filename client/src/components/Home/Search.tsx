import { useState } from 'react';
import axios from 'axios';
import * as S from './Search.style';

type SearchProps = {
  setValue: (value: string) => void;
  setCategory: (option: string) => void;
  handleSearch: () => void;
};

function Search({ setValue, setCategory, handleSearch }: SearchProps) {
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setValue(e.target.value);
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
    setCategory(e.target.value);
  };

  // * 일치하는 검색어 없으면 404 에러 뜸
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      // handleSearch();
    }
  };

  return (
    <S.SearchWrapper>
      <S.InputWrapper>
        <S.SearchIcon />
        <S.Input
          type='text'
          placeholder='검색하기'
          onChange={handleInput}
          onKeyDown={handleKeyPress}
        />
      </S.InputWrapper>
      <S.Nav>
        <S.NavList>
          <li>작성자</li>
          <li>프로젝트</li>
          <li>기술스택</li>
        </S.NavList>
        <S.Select name='search' id='search' onChange={handleSelect}>
          <option value='userName'>작성자</option>
          <option value='title'>프로젝트</option>
          <option value='tech-stack'>기술스택</option>
        </S.Select>
        <S.ArrowDownIcon />
      </S.Nav>
    </S.SearchWrapper>
  );
}

export default Search;
