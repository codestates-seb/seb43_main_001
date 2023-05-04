import styled, { css } from 'styled-components';

// constants
import { COLOR } from '../../constants';

const { cardColor, subFontColor } = COLOR;

// background-color: ${(props) => props.theme.themeStyle.toggleColor};
export const DetailTitle = styled.section`
  padding: 5px 1rem;
  border-radius: 12px;
`;

// upper downer common style
const CommonStlye = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

// upper section
export const TitleUpper = styled.div`
  ${CommonStlye}
  padding:1rem 1.5rem;
`;

export const ProjectTitle = styled.div`
  font-size: 1.5rem;
  font-weight: 800;
`;

export const UserInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const userName = styled.div`
  font-size: 1rem;
  font-weight: 600;
`;

export const userImg = styled.div`
  width: 50px;
  height: 50px;
  border: 1px solid blue;
  border-radius: 50%;
  margin-left: 1rem;
`;

// downer section
export const TitleDowner = styled.div`
  ${CommonStlye}
  padding: 1rem 1.5rem;
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
  border-radius: 5px;
  padding: 0.8rem;
  background-color: ${(props) => (props.darkGrey ? cardColor : subFontColor)};
  color: ${(props) => (props.darkGrey ? 'white' : 'black')};
  cursor: pointer;
`;
