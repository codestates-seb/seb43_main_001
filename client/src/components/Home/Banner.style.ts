import styled from 'styled-components';

export const Banner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 508px;
  padding: 0 15px;
  color: #000;
  background-color: #f0f0f0;
  text-align: center;

  h1 {
    margin-bottom: 20px;
    font-size: 50px;
    font-weight: 700;
  }

  p {
    margin-bottom: 55px;
    font-size: 20px;
    font-weight: 400;
  }

  @media ${({ theme }) => theme.breakpoints.TABLETMIN} {
    height: 650px;

    p {
      font-size: 24px;
    }
  }

  @media ${({ theme }) => theme.breakpoints.DESKTOPMIN} {
    height: 700px;

    h1 {
      font-size: 68px;
    }
  }
`;
