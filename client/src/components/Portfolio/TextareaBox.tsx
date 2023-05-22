import React from 'react';
import * as S from './TextareaBox.style';
type TextareaBoxProps = {
  text: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
  name?: string;
};

const TextareaBox: React.FC<TextareaBoxProps> = ({ text, onChange, value, name }) => {
  return (
    <S.TextareaContainer>
      <S.Title>
        {text}
        {name === 'description' && <S.caution>* 필수 입력 사항입니다</S.caution>}
      </S.Title>
      <S.TextareaBox
        placeholder={text + '을(를) 입력해주세요(60자 이내)'}
        name={name}
        onChange={onChange}
        maxLength={60}
        value={value}
      />
    </S.TextareaContainer>
  );
};

export default TextareaBox;
