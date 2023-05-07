import styled from 'styled-components';
import { COLOR } from '../constants';
// constants
import { MAX_SIZE } from '../constants/index';

const { content } = MAX_SIZE;
const { subFontColor } = COLOR;
export const PortfolioContainer = styled.div`
  /* border: 1px solid black; */
  width: 100%;
  padding: 0 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 0.8rem;

  input,
  textarea {
    font-size: 0.8rem;
    color: ${(props) => (props.theme.value === 'light' ? 'black' : 'white')};
  }

  input::placeholder {
    color: ${subFontColor};
  }
  textarea::placeholder {
    color: ${subFontColor};
  }
  @media ${(props) => props.theme.breakpoints.TABLETMIN} {
    padding: 0 40px;
    font-size: 1.1rem;
    input,
    textarea {
      font-size: 1.1rem;
    }
  }

  @media ${(props) => props.theme.breakpoints.DESKTOPMIN} {
    max-width: ${content};
    margin: 0 auto;
    font-size: 1.5rem;
    input,
    textarea {
      font-size: 1.5rem;
    }
  }
`;
