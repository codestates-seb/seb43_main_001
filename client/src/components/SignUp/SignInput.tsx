import * as S from './SignInput.style';

// react
import React from 'react';

type SignInputProps = {
  type: string;
  name: string;
  placeholder: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  children?: React.ReactNode;
};

const SignInput: React.FC<SignInputProps> = ({ type, name, placeholder, value, setValue }) => {
  return (
    <S.Wrapper>
      <S.SignTitle>{name}</S.SignTitle>
      <S.SignInput
        className={type === 'email' ? 'shorten-input' : ''}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
      />
    </S.Wrapper>
  );
};

export default SignInput;
