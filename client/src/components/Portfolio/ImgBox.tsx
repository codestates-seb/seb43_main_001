import React from 'react';
import * as S from './ImgBox.style';

type ImgBoxProps = {
  text: string;
  img: File | null;
  selectFile: (event: React.ChangeEvent<HTMLInputElement>) => void;
  representativeImgUrl: string | null;
};

const ImgBox: React.FC<ImgBoxProps> = ({ text, img, selectFile, representativeImgUrl }) => {
  return (
    <S.ImgContainer>
      <S.Title>{text}</S.Title>
      <S.ImgSelector>
        {img ? (
          <S.ImgName>{img.name}</S.ImgName>
        ) : representativeImgUrl ? (
          <S.ImgName>{representativeImgUrl}</S.ImgName>
        ) : (
          <S.ImgName className='gray-font'>{'사진을 선택해주세요'}</S.ImgName>
        )}
        <S.ImgInput htmlFor='file'>
          <span>업로드</span>
        </S.ImgInput>
        <input type='file' className='file' id='file' onChange={selectFile} />
      </S.ImgSelector>
    </S.ImgContainer>
  );
};

export default ImgBox;
