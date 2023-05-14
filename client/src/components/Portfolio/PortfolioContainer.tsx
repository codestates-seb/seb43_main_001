import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as S from './PortfolioContainer.style';
import TextBox from './TextBox';
import ImgBox from './ImgBox';
import TagBox from './TagBox';
import TextareaBox from './TextareaBox';
import DetailBox from './DetailBox';
import UserBox from './UserBox';
import useInput from '../../hooks/useInput';
import { useRouter } from '../../hooks/useRouter';

type PortfolioContainerProps = {
  isEdit: boolean;
};

const PortfolioContainer: React.FC<PortfolioContainerProps> = ({ isEdit }) => {
  const { routeTo, backTo } = useRouter();
  const setting =
    '<p><br></p><h3><strong>*본 형식은 작성을 돕는 가이드일 뿐입니다, 자유로운 형식으로 작성해보세요*</strong></h3><p><br></p><h3>기간 : 2023.00.00 - 2023.00.00</h3><p><br></p><h3>Overview ｜ 프로젝트 요약</h3><p>본인이 진행한 프로젝트에서 어떤 일을 진행했는지 알 수 있도록 간결하게 설명해주세요</p><p><br></p><h3>Role ｜ 역할</h3><p>해당 프로젝트에서 본인이 기여한 정도와 역할을 작성해 주세요.</p><p>기여도 : 00%</p><p><br></p><h3>Function ｜ 기능</h3><p> 작동 화면과 간단한 설명으로 프로젝트에서 구현한 기능에 대해서 설명해주세요.</p><p><br></p><p><br></p><h3>Result ｜ 성과</h3><p>해당 프로젝트의 성과를 작성해 주세요. 수치, 숫자로 성과를 표현할 수 있다면 설득력이 높아져요. 수치로 표현하기 어려운 성과라면 정성적인 성과도 괜찮아요.</p><p><br></p><p><br></p><h3>Lesson-Learned ｜ 프로젝트 후 배운 것</h3><p>모든 프로젝트가 성공하지 못했더라도, 배운 점은 있을 거예요. 해당 프로젝트에서 배운 점, 아쉬웠던 점, 개선할 수 있는 점을 적어서 다음 프로젝트 진행 시에 이를 보완할 수 있다는 것을 어필해 보세요.</p>';
  // 포트폴리오 정보
  const title = useInput('');
  const [img, setImg] = useState<File | null>(null);
  const gitLink = useInput('');
  const distributionLink = useInput('');
  const [tags, setTags] = useState<string[]>([]);
  const description = useInput('');
  const [content, setContent] = useState(setting);

  // tag 조작 함수
  const removeTags = (indexToRemove: number) => {
    setTags(tags.filter((it: string, index: number) => index !== indexToRemove));
  };

  const addTags = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const tag = event.currentTarget.value;
    if (tags.includes(tag) || tag.length === 0) {
      console.log('Fail!');
      return;
    }
    event.currentTarget.value = '';
    setTags([...tags, tag]);
  };

  // 파일 선택 함수
  const selectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.files?.[0]) {
      const file = event.currentTarget.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      setImg(file);
    }
  };

  const postPortFolio = async () => {
    // form 형태로 전달
    const body = new FormData();
    const data = {
      // id: String(Math.floor(Math.random() * 10000)),
      userId: 1,
      title: title.value,
      // img: img,
      gitLink: gitLink.value,
      distributionLink: distributionLink.value,
      // tags: tags,
      description: description.value,
      content,
    };

    console.log(JSON.stringify(data));
    // blob 형태로 변환 후 form에 추가
    const blob = new Blob([JSON.stringify(data)], {
      type: 'application/json',
    });
    body.append('portfolio', blob);

    // blob에서 정보 받아오기
    const text = await new Response(blob).text();
    // console.log(JSON.parse(text));

    const res = await axios.post('http://43.201.157.191:8080/portfolios', data, {
      // headers: {
      //   'Content-Type': 'multipart/form-data',
      // },
    });
  };

  const getPortFolio = async () => {
    const { data } = await axios.get('http://43.201.157.191:8080/portfolios/1');
    const portfolio = data;
  };

  useEffect(() => {
    if (isEdit) {
      getPortFolio();
    }
  }, [isEdit]);

  return (
    <S.PortfolioLayout>
      {isEdit ? (
        <>
          <UserBox />
          <TextBox text={'제목'} {...title} />
          <ImgBox text={'대표 사진'} img={img} selectFile={selectFile} />
          <TextBox text={'깃허브 링크'} {...gitLink} />
          <TextBox text={'배포 링크'} {...distributionLink} />
          <TagBox
            text={'기술스택(업무 툴/스킬)'}
            tags={tags}
            addTags={addTags}
            removeTags={removeTags}
          />
          <TextareaBox text={'프로젝트 소개글'} {...description} />
          <DetailBox text={'프로젝트 설명'} content={content} setContent={setContent} />
          <S.ButtonContainer>
            <S.PrevBtn onClick={backTo}>이전 페이지</S.PrevBtn>
            <S.SubmitBtn>수정 하기</S.SubmitBtn>
          </S.ButtonContainer>
        </>
      ) : (
        <>
          <UserBox />
          <TextBox text={'제목'} {...title} />
          <ImgBox text={'대표 사진'} img={img} selectFile={selectFile} />
          <TextBox text={'깃허브 링크'} {...gitLink} />
          <TextBox text={'배포 링크'} {...distributionLink} />
          <TagBox
            text={'기술스택(업무 툴/스킬)'}
            tags={tags}
            addTags={addTags}
            removeTags={removeTags}
          />
          <TextareaBox text={'프로젝트 소개글'} {...description} />
          <DetailBox text={'프로젝트 설명'} content={content} setContent={setContent} />
          <S.ButtonContainer>
            <S.PrevBtn onClick={backTo}>이전 페이지</S.PrevBtn>
            <S.SubmitBtn onClick={postPortFolio}>작성 하기</S.SubmitBtn>
          </S.ButtonContainer>
        </>
      )}
    </S.PortfolioLayout>
  );
};

export default PortfolioContainer;
