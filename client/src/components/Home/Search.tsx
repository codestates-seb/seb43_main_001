import * as S from './Search.style';

function Search() {
  return (
    <S.SearchWrapper>
      <S.InputWrapper>
        <div>
          <S.SearchIcon />
        </div>
        <input type='text' placeholder='검색하기' />
      </S.InputWrapper>
      <S.Nav>
        <S.NavList>
          <li>작성자</li>
          <li>프로젝트</li>
          <li>기술스택</li>
        </S.NavList>
        <S.Select name='search' id='search'>
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