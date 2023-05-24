import React from 'react';
import * as S from './TextBox.style';
type TextBoxProps = {
  text: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  name?: string;
};

const TextBox: React.FC<TextBoxProps> = ({ text, onChange, value, name }) => {
  return (
    <S.TextContainer>
      <S.Title>
        {text} {name === 'title' && <S.caution>* 필수 입력 사항입니다</S.caution>}
      </S.Title>

      <S.InputBox
        name={name}
        placeholder={text + '을(를) 입력해주세요'}
        maxLength={name === 'title' ? 50 : 100}
        onChange={onChange}
        value={value}
      ></S.InputBox>
    </S.TextContainer>
  );
};

export default TextBox;
