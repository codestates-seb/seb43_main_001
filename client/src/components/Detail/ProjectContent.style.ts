import styled from 'styled-components';

// constant
import { COLOR } from '../../constants';

const { subFontColor } = COLOR;

export const Container = styled.section`
  border-top: 2px solid ${subFontColor};
  margin-top: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;

  padding: 2rem;
  img {
    max-width: 100%;
  }
`;
