import styled, { css } from 'styled-components';
import * as S from '../common/YellowTag.style';
// constants
import { COLOR } from '../../constants';

const { cardColor, subFontColor } = COLOR;

export const DetailTitle = styled.section`
  margin-top: 0.5rem;
  padding: 10px 0;
  border-radius: 12px;
  @media ${(props) => props.theme.breakpoints.TABLETMIN} {
    padding: 10px 1rem;
  }
`;

// upper downer common style
const CommonStlye = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px 0.5rem;
  @media ${(props) => props.theme.breakpoints.TABLETMIN} {
    padding: 10px 1rem;
    /* flex-direction: row; */
  }
`;

// upper section
export const TitleUpper = styled.div`
  ${CommonStlye}
  align-items:center;
`;

export const ProjectTitle = styled.p`
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 25px;
  @media ${(props) => props.theme.breakpoints.TABLETMIN} {
    font-size: 1.8rem;
  }
`;

export const UserInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: start;
`;

export const userName = styled.div`
  font-size: 1rem;
  @media ${(props) => props.theme.breakpoints.TABLETMIN} {
    font-size: 1.4rem;
  }
`;

export const userImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 1rem;
  cursor: pointer;
`;

// downer section
export const TitleDowner = styled.div`
  ${CommonStlye}
`;

export const Tags = styled.div`
  display: flex;
  padding: 1rem 0;
  & > div {
    margin-right: 0.8rem;
  }
`;

export const Links = styled.div`
  display: flex;
  padding: 1rem 0;
  & > a {
    margin-right: 0.5rem;
  }
`;

export const Link = styled.a<{ darkGrey?: boolean }>`
  font-size: 0.7rem;
  border-radius: 5px;
  text-align: center;
  padding: 0.8rem;
  background-color: ${(props) => (props.darkGrey ? cardColor : subFontColor)};
  color: ${(props) => (props.darkGrey ? 'white' : 'black')};
  cursor: pointer;

  @media ${(props) => props.theme.breakpoints.TABLETMIN} {
    font-size: 1rem;
  }
`;

export const YellowTagCutsom = styled(S.Tags)`
  font-size: 0.7rem;
  @media ${(props) => props.theme.breakpoints.TABLETMIN} {
    font-size: 1rem;
  }
`;
// edit part
export const UserInfoEdit = styled.div`
  display: flex;
  justify-content: start;
  @media ${(props) => props.theme.breakpoints.TABLETMIN} {
    justify-content: end;
    font-size: 1rem;
  }
`;

export const EditBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-right: 1rem;
`;

const CommonStyleP = css`
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  padding: 0.6rem;
  margin-right: 0.1rem;

  @media ${(props) => props.theme.breakpoints.TABLETMIN} {
    font-size: 1.1rem;
  }
`;

export const Edit = styled.p`
  ${CommonStyleP}
  &:hover {
    color: grey;
  }
`;
export const Delete = styled.p`
  ${CommonStyleP}
  &:hover {
    color: red;
  }
`;
