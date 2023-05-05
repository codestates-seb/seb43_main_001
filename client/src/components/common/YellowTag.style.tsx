import styled from 'styled-components';

// constants
import { COLOR } from '../../constants';

const { mainColor } = COLOR;

export const Tags = styled.div`
  padding: 0.3rem 1.2rem;
  border-radius: 12px;
  font-weight: 800;
  background-color: ${mainColor};
  color: black;
`;
