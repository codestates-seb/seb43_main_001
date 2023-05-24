import styled from 'styled-components';

export const UserSort = styled.div`
  /* width: 60%; */
`;
export const PortfolioContainer = styled.div`
  width: 100%;
  height: 95%;
  padding: 10px;
  overflow: scroll;
  -ms-overflow-style: none;
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(1, 1fr);
  align-content: start;
  ::-webkit-scrollbar {
    display: none;
  }

  @media ${({ theme }) => theme.breakpoints.TABLETMIN} {
    grid-template-columns: repeat(2, 1fr);
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
export const ErrorContainer = styled.div`
  margin-top: 50px;
  text-align: center;
`;

export const Target = styled.div`
  height: 1px;
`;
