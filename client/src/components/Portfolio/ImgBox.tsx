import React, { useState } from 'react';
import * as S from './ImgBox.style';

type ImgBoxProps = {
  text: string;
};

const ImgBox: React.FC<ImgBoxProps> = ({ text }) => {
  const [imgName, setImgName] = useState<string>('');

  return (
    <S.ImgContainer>
      <S.Title>{text}</S.Title>
      <S.ImgSelector>
        {imgName ? (
          <S.ImgName>{imgName}</S.ImgName>
        ) : (
          <S.ImgName className='gray-font'>{'사진을 선택해주세요'}</S.ImgName>
        )}
        <S.ImgInput htmlFor='file'>
          <span>업로드</span>
        </S.ImgInput>
        <input
          type='file'
          className='file'
          id='file'
          onChange={(e) => {
            if (e.currentTarget.files?.[0]) {
              const file = e.currentTarget.files[0];
              const reader = new FileReader();
              reader.readAsDataURL(file);
              reader.onloadend = (event) => {
                setImgName(file.name);
              };
            }
          }}
        />
      </S.ImgSelector>
    </S.ImgContainer>
  );
};

export default ImgBox;
