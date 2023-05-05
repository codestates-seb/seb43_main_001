import styled from 'styled-components';

export const Container = styled.section`
  border: 1px solid black;
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
`;

export const CommentShow = styled.div`
  border: 1px solid red;
`;

export const CommentForm = styled.form`
  /* Add your CSS styling here */
  width: 100%;
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CommentInput = styled.input`
  /* Add your CSS styling here */
  flex: 0 1 25rem;
  height: 1.5rem;
  border-radius: 5px;
  background-color: transparent;
  border: 2px solid ${(props) => props.theme.themeStyle.inputBorderColor};
  margin-right: 1rem;
  padding: 5px;
  font-weight: 800;
`;
