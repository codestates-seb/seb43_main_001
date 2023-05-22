import styled from 'styled-components';

export const OAuthButton = styled.button`
  display: flex;
  border-radius: 50%;
  cursor: pointer;
  font-size: 3rem;

  color: ${(props) => props.theme.themeStyle.fontColor};
`;
