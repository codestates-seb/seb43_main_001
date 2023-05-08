import styled from 'styled-components';

// constants
import { COLOR } from '../../constants';

const { mainColor } = COLOR;

export const Tags = styled.div`
  padding: 0.3rem 1.2rem;
  border-radius: 6px;
  font-weight: 400;
  background-color: ${mainColor};
  color: black;
  text-align: center;
`;
