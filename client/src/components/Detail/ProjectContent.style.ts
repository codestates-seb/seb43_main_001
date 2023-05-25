import styled from 'styled-components';

// constant
import { COLOR } from '../../constants';

const { subFontColor } = COLOR;

export const Container = styled.section`
  border-top: 2px solid ${subFontColor};
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 3rem;
  margin-top: 5rem;
  img {
    max-width: 100%;
  }
  .quill {
    & > div {
      background-color: ${(props) => props.theme.themeStyle.backgroundColor};
      border: none;
    }
    margin-top: 1rem;
    border: none !important;
    & p {
      font-size: 1.2rem;
      font-weight: 500;
    }
  }
`;
