import styled from 'styled-components';

export const UserInfo = styled.div`
  width: 100%;
  @media ${(props) => props.theme.breakpoints.DESKTOPMIN} {
    width: 35%;
  }
`;
export const SelectBtn = styled.div`
  width: 200px;
  margin: 20px auto;
  display: flex;
  justify-content: space-between;
  button {
    color: ${(props) => props.theme.themeStyle.fontColor};
  }
  @media ${(props) => props.theme.breakpoints.DESKTOPMIN} {
    display: none;
  }
`;
export const MoreInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5px 0;
  width: 100%;
  label {
    display: flex;
    align-items: flex-end;
    margin: 5px 0;
  }
  label:first-child {
    font-size: 0.8rem;
    display: block;
  }
  p {
    font-size: 1rem;
  }
  button {
    margin: 10px auto;
  }
`;
export const DetailBtns = styled.div`
  width: 300px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  button:last-child {
    color: ${(props) => props.theme.themeStyle.fontColor};
  }
`;
