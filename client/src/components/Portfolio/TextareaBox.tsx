import React from 'react';
import * as S from './TextareaBox.style';
type TextareaBoxProps = {
  text: string;
  onChange: (e: any) => void;
  value: string;
};

const TextareaBox: React.FC<TextareaBoxProps> = ({ text, onChange, value }) => {
  return (
    <S.TextareaContainer>
      <S.Title>{text}</S.Title>
      <S.TextareaBox
        placeholder={text + '을(를) 입력해주세요(60자 이내)'}
        onChange={onChange}
        maxLength={60}
        value={value}
      />
    </S.TextareaContainer>
  );
};

export default TextareaBox;
