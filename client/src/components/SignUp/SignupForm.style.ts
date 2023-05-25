import styled from 'styled-components';

// constant
import { COLOR } from '../../constants';

const { mainColor } = COLOR;

type ButtonProps = {
  nameError: boolean;
};
export const Container = styled.section`
  position: relative;
  width: 550px;
  margin: 0 auto;
`;

export const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 550px;
  gap: 10px;
  margin: 0 auto;
`;
export const Title = styled.div`
  text-align: start;
  font-size: 3rem;
  font-weight: bold;
`;

export const checkDuplicateEmailButton = styled.button<ButtonProps>`
  position: absolute;
  right: 5.9rem;
  top: ${(props) => (props.nameError ? '13rem' : '11rem')};
  width: 50px;
  height: 30px;
  border-radius: 8px;
  background-color: ${mainColor};
  font-size: 5px;
  font-weight: bold;
`;

export const SignUpButton = styled.button`
  width: 360px;
  height: 45px;
  background-color: ${mainColor};
  font-size: 1.2rem;
  font-weight: 500;
  border-radius: 8px;
`;

export const AlreadySignUp = styled.p`
  & strong {
    cursor: pointer;
  }
`;
export const ErrorMessage = styled.p`
  color: red;
  width: 360px;
  text-align: start;
`;
