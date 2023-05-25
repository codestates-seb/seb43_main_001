import styled from 'styled-components';

export const ModalBackground = styled.div<{ OnOff: boolean }>`
  display: ${(props) => (props.OnOff ? 'block' : 'none')};
  width: 100vw;
  height: 100vh;
  background-color: #000000cd;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 500;
  color: black;
`;
export const ModalContainer = styled.div`
  width: 500px;
  height: 280px;
  background-color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  border-radius: 20px;
  overflow: hidden;
`;

export const Title = styled.div`
  height: 80px;
  background-color: black;
  color: white;
  font-size: 1.5rem;
  text-align: center;
  line-height: 80px;
`;
export const TextBox = styled.div`
  padding: 20px;
  text-align: center;
`;
export const BtnBox = styled.div`
  position: absolute;
  width: 100%;
  left: 0;
  bottom: 30px;
  display: flex;
  justify-content: center;
  button {
    width: 150px;
    margin: 0 20px;
    &:hover {
      color: gray;
    }
  }
`;
