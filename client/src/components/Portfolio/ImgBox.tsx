import React, { useState } from 'react';
import { PortfolioAPI } from '../../api/client';
import * as S from './ImgBox.style';

type ImgBoxProps = {
  text: string;
  img: File | null;

  setImg: (value: React.SetStateAction<File | null>) => void;
  representativeImgUrl: string;
  portfolioId?: string;
  isEdit?: boolean;
};

const ImgBox: React.FC<ImgBoxProps> = ({
  text,
  setImg,
  representativeImgUrl,
  portfolioId,
  isEdit,
}) => {
  const [imgSrc, setImgSrc] = useState<string>(representativeImgUrl);

  //* Preview Img를 조작하는 함수
  const handlePreviewImg = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.files?.[0]) {
      const file = event.currentTarget.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = async () => {
        // 수정 시
        if (isEdit) {
          try {
            // 이미지 업로드
            const url = await PortfolioAPI.uploadThumbnail(file, Number(portfolioId));
            setImgSrc(url);
          } catch (error) {
            console.error(error);
          }
        }
        // 생성 시
        else {
          setImgSrc(String(reader.result));
          setImg(file);
        }
      };
    }
  };

  // *Preview Img 삭제하는 함수
  const handleRemoveImg = async () => {
    // 수정 시
    if (isEdit) {
      const url = await PortfolioAPI.uploadThumbnail(null, Number(portfolioId));
      setImgSrc(url);
    }
    // 생성 시
    else {
      setImg(null);
      setImgSrc('');
    }
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
