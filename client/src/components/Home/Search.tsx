import { useState } from 'react';
import axios from 'axios';
import * as S from './Search.style';

function Search() {
  const [value, setValue] = useState('');
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setValue(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      axios
        .get('http://localhost:8000/data')
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
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
        <S.Select name='search' id='search' onChange={(e) => console.dir(e.target.value)}>
          <option value='writer'>작성자</option>
          <option value='project'>프로젝트</option>
          <option value='tech-stack'>기술스택</option>
        </S.Select>
        <S.ArrowDownIcon />
      </S.Nav>
    </S.SearchWrapper>
  );
}

export default Search;
