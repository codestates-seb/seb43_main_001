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
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-grow: 1;

  div,
  input {
    height: 34px;
    border: 1px solid ${COLOR.subFontColor};
    background-color: ${({ theme }) => theme.themeStyle.searchBarColor};

    @media ${({ theme }) => theme.breakpoints.DESKTOPMIN} {
      height: 45px;
    }
  }

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 34px;
    border-right: 0;
    border-radius: 8px 0 0 8px;

    @media ${({ theme }) => theme.breakpoints.DESKTOPMIN} {
      width: 40px;
    }
  }

  input {
    box-sizing: border-box;
    flex-grow: 1;
    padding: 3px;
    border-left: none;

    ::placeholder {
      color: ${COLOR.subFontColor};
      font-size: 15px;
    }

    :focus {
      outline: none;
    }
  }
`;

export const SearchIcon = styled(IoIosSearch)`
  font-size: 20px;
  color: ${COLOR.subFontColor};

  @media ${({ theme }) => theme.breakpoints.DESKTOPMIN} {
    font-size: 23px;
  }
`;

export const Nav = styled.nav`
  position: relative;
`;

export const NavList = styled.ul`
  display: none;

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
  flex-shrink: 0;
  width: 75px;
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

  @media ${({ theme }) => theme.breakpoints.TABLETMIN} {
    width: 85px;
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
