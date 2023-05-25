import styled from 'styled-components';

import { COLOR } from '../../constants';

const { subFontColor, divider } = COLOR;

export const PageBtn = styled.button`
  border-radius: 8px;
  background-color: ${subFontColor};
  color: black;
  margin: 0 0.3rem;
  padding: 0 0.6rem;
  font-size: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: ${divider};
  }
`;
