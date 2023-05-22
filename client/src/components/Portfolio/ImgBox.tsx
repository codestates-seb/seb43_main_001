import React, { useState } from 'react';
import * as S from './ImgBox.style';

type ImgBoxProps = {
  text: string;
  img: File | null;

  setImg: (value: React.SetStateAction<File | null>) => void;
  representativeImgUrl: string | null;
};

const ImgBox: React.FC<ImgBoxProps> = ({ text, setImg, representativeImgUrl }) => {
  const [imgSrc, setImgSrc] = useState<string>(representativeImgUrl ? representativeImgUrl : '');

  //* Preview Img를 조작하는 함수
  const handlePreviewImg = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.files?.[0]) {
      const file = event.currentTarget.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = function () {
        setImgSrc(String(reader.result));
      };

      if (file) setImg(file);
    }
  };

  // *Preview Img 삭제하는 함수
  const handleRemoveImg = () => {
    setImg(null);
    setImgSrc('');
  };
  return (
    <S.ImgContainer>
      <S.Title>
        <div className='title_container'>
          {text}
          <div className='button_container'>
            <S.ImgInput htmlFor='file'>
              <span>{imgSrc ? '이미지 수정' : '이미지 추가 '}</span>
            </S.ImgInput>
            <input
              type='file'
              className='file'
              id='file'
              onChange={(e) => {
                // selectFile(e);
                handlePreviewImg(e);
              }}
            />
            {imgSrc && <S.RemoveBtn onClick={handleRemoveImg}>이미지 삭제</S.RemoveBtn>}
          </div>
        </div>
      </S.Title>

      {
        // ! 이미지 주소가 없을 경우 (서버에서 지정한 화면 출력)
        imgSrc ? (
          <S.Preview>
            <img src={imgSrc} alt='preview-img' />
          </S.Preview>
        ) : (
          <S.ImgSelector>
            <S.ImgName className='gray-font'>{'사진을 선택해주세요'}</S.ImgName>
          </S.ImgSelector>
        )
      }
    </S.ImgContainer>
  );
};

export default ImgBox;
