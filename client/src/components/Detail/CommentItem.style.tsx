import styled from 'styled-components';
import { COLOR } from '../../constants';

const { subFontColor } = COLOR;

export const Container = styled.section`
  padding: 1rem;
  border: 10;
  border-radius: 5px;
  box-shadow: 0px 2px 2px ${subFontColor};
`;

export const Update = styled.div``;

export const Content = styled.div`
  font-weight: 700;
`;

export const CreateAt = styled.div`
  display: flex;
  justify-content: flex-end;
`;
