import * as S from './Search.style';
import { skillList } from './skillsData';

type SearchProps = {
  setValue: (value: string) => void;
  category: string;
  setCategory: (option: string) => void;
  handleSearch: () => void;
  setSkillValue: (skill: string) => void;
};

function Search({ setValue, category, setCategory, handleSearch, setSkillValue }: SearchProps) {
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSelectCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  const handleSelectSkill = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSkillValue(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleClickList = (e: React.MouseEvent<HTMLLIElement>) => {
    setCategory(e.currentTarget.id);
  };

  return (
    <S.SearchWrapper>
      <S.InputWrapper>
        {category === 'skill' ? (
          <S.SkillsSelect onChange={handleSelectSkill}>
            <option value=''>-- 기술 스택을 선택하세요 --</option>
            {skillList.map((skill, index) => {
              return (
                <option key={index} value={skill}>
                  {skill}
                </option>
              );
            })}
          </S.SkillsSelect>
        ) : (
          <>
            <S.SearchIcon />
            <S.Input
              type='text'
              placeholder='검색하기'
              onChange={handleInput}
              onKeyDown={handleKeyPress}
            />
          </>
        )}
      </S.InputWrapper>
      <S.Nav>
        <S.NavList>
          <li
            id='userName'
            className={category === 'userName' ? 'select' : ''}
            onClick={handleClickList}
          >
            작성자
          </li>
          <li id='title' className={category === 'title' ? 'select' : ''} onClick={handleClickList}>
            프로젝트
          </li>
          <li id='skill' className={category === 'skill' ? 'select' : ''} onClick={handleClickList}>
            기술스택
          </li>
        </S.NavList>
        <S.Select name='search' id='search' onChange={handleSelectCategory} value={category}>
          <option value='userName'>작성자</option>
          <option value='title'>프로젝트</option>
          <option value='skill'>기술스택</option>
        </S.Select>
        <S.ArrowDownIcon />
      </S.Nav>
    </S.SearchWrapper>
  );
}

export default Search;
