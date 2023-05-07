import React from 'react';
import * as S from './TextBox.style';
type TextBoxProps = {
  text: string;
};

const TextBox: React.FC<TextBoxProps> = ({ text }) => {
  return (
    <S.TextContainer>
      <S.Title>{text}</S.Title>
      <S.InputBox placeholder={text + '을(를) 입력해주세요'}></S.InputBox>
    </S.TextContainer>
  );
};

export default TextBox;
