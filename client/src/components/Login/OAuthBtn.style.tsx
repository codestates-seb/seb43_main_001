import styled from 'styled-components';
export const OAuthButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 290px;
  height: 75px;
  border-radius: 50px;
  cursor: pointer;

  border: black solid 0.1rem;
  background-color: white;
  > img {
    height: 50px;
    width: 50px;
    margin-right: 0.7rem;
  }
  font-size: 1.5rem;
  font-weight: bold;
`;
