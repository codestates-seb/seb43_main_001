import styled from 'styled-components';
import { IoIosSearch } from 'react-icons/io';
import { RxCaretDown } from 'react-icons/rx';
import { COLOR } from '../../constants';

export const SearchWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 60px;
  background-color: ${({ theme }) => theme.themeStyle.backgroundColor};

  @media ${({ theme }) => theme.breakpoints.TABLETMIN} {
    height: 75px;
  }

  @media ${({ theme }) => theme.breakpoints.DESKTOPMIN} {
    height: 90px;
  }
`;

export const InputWrapper = styled.div`
  width: 100%;
  position: relative;
`;

export const SearchIcon = styled(IoIosSearch)`
  font-size: 20px;
  color: ${COLOR.subFontColor};
  position: absolute;
  top: calc((100% - 20px) / 2);
  left: 7px;

  @media ${({ theme }) => theme.breakpoints.DESKTOPMIN} {
    top: calc((100% - 23px) / 2);
    font-size: 23px;
  }
`;

export const Input = styled.input`
  display: flex;
  width: 100%;
  height: 34px;
  padding: 5px 5px 5px 30px;
  border: 1px solid ${COLOR.subFontColor};
  border-radius: 8px 0 0 8px;
  color: ${({ theme }) => theme.themeStyle.fontColor};
  background-color: ${({ theme }) => theme.themeStyle.searchBarColor};

  ::placeholder {
    font-size: 15px;
    color: ${COLOR.subFontColor};
  }

  :focus {
    outline: none;
  }

  @media ${({ theme }) => theme.breakpoints.DESKTOPMIN} {
    height: 45px;
    padding-left: 33px;
  }
`;

export const Nav = styled.nav`
  position: relative;
`;

export const NavList = styled.ul`
  display: none;

  li {
    word-break: keep-all;
    cursor: pointer;
  }

  @media ${({ theme }) => theme.breakpoints.DESKTOPMIN} {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    height: 45px;
    padding: 0 20px;
    border: 1px solid ${COLOR.subFontColor};
    border-left: none;
    border-radius: 0 8px 8px 0;
    font-size: 15px;
    font-weight: 500;
  }
`;

export const Select = styled.select`
  width: 85px;
  height: 34px;
  padding-left: 12px;
  border: 1px solid ${COLOR.subFontColor};
  border-left: none;
  border-radius: 0 8px 8px 0;
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme }) => theme.themeStyle.fontColor};
  background-color: ${({ theme }) => theme.themeStyle.backgroundColor};
  cursor: pointer;

  // 기본 화살표 스타일 제거
  -o-appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  :focus {
    outline: none;
  }

  @media ${({ theme }) => theme.breakpoints.DESKTOPMIN} {
    display: none;
  }
`;

export const ArrowDownIcon = styled(RxCaretDown)`
  position: absolute;
  top: 8px;
  right: 5px;
  font-size: 18px;

  @media ${({ theme }) => theme.breakpoints.DESKTOPMIN} {
    display: none;
  }
`;
