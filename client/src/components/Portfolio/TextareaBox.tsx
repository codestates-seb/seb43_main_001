import React from 'react';
import * as S from './TextareaBox.style';
type TextareaBoxProps = {
  text: string;
};

const TextareaBox: React.FC<TextareaBoxProps> = ({ text }) => {
  return (
    <S.TextareaContainer>
      <S.Title>{text}</S.Title>
      <S.TextareaBox placeholder={text + '을(를) 입력해주세요(60자 이내)'} maxLength={60} />
    </S.TextareaContainer>
  );
};

export default TextareaBox;
