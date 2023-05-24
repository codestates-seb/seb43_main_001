import React from 'react';
import * as S from './DetailBox.style';

import Editor from './Editor';

type DetailBoxProps = {
  text: string;
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
};

const DetailBox: React.FC<DetailBoxProps> = ({ text, content, setContent }) => {
  return (
    <S.DetailContainer>
      <S.Title>{text}</S.Title>
      <Editor writeMode={true} content={content} setContent={setContent} />
    </S.DetailContainer>
  );
};

export default DetailBox;
