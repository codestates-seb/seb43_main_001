import styled from 'styled-components';

export const UserSort = styled.div`
  width: 60%;
`;
export const PortfolioContainer = styled.div`
  height: 100vh;
  padding: 10px;
  overflow: scroll;
  -ms-overflow-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-auto-columns: minmax(316px, 316px);
  gap: 40px;
  ::-webkit-scrollbar {
    display: none;
  }
`;
export const PortfolioBtns = styled.div`
  display: flex;
  button {
    padding: 0px 10px;
    border-right: 1px solid black;
  }
  button:last-child {
    border: 0;
  }
`;
