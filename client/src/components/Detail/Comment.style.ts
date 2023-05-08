import styled from 'styled-components';
import { COLOR } from '../../constants';

const { subFontColor } = COLOR;

export const Container = styled.section`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
`;

export const CommentShow = styled.div`
  flex: 0 1 350px;
  width: 65%;
  border: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  box-shadow: 0px 2px 2px ${subFontColor};
  overflow: auto;
`;

export const CommentForm = styled.form`
  width: 100%;
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CommentInput = styled.input`
  flex: 0 1 25rem;
  height: 1.5rem;
  border-radius: 5px;
  background-color: transparent;
  border: 2px solid ${(props) => props.theme.themeStyle.inputBorderColor};
  margin-right: 1rem;
  padding: 5px;
  font-weight: 800;
`;
