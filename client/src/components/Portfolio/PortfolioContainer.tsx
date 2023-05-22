import * as S from './PortfolioContainer.style';

// react hooks
import React, { useEffect, useState } from 'react';

// react component
import TextBox from './TextBox';
import ImgBox from './ImgBox';
import TagBox from './TagBox';
import TextareaBox from './TextareaBox';
import DetailBox from './DetailBox';
import UserBox from './UserBox';

// react-router-dom
import { useParams } from 'react-router-dom';

// custom hooks
import { useRouter } from '../../hooks/useRouter';
import { usePostPortfolio } from '../../hooks/usePostPortfolio';
import { usePatchPortfolio } from '../../hooks/usePatchPortfolio';

// types
import { postDto, GetPortfolio, GetUserProfile } from '../../types';

type PortfolioContainerProps = {
  isEdit: boolean;
  UserProfile: GetUserProfile;
  PortfolioInfo?: GetPortfolio;
};

const PortfolioContainer: React.FC<PortfolioContainerProps> = ({
  isEdit,
  UserProfile,
  PortfolioInfo,
}) => {
  const { backTo } = useRouter();

  // portfolioId 받기
  const { portfolioId } = useParams();

  // 유저 정보 받기
  const userId: number | null = UserProfile ? UserProfile.userId : null;
  const name: string = UserProfile ? UserProfile.name : '';
  const profileImg: string = UserProfile ? UserProfile.profileImg : '';

  const setting =
    '<p><br></p><h3><strong>*본 형식은 작성을 돕는 가이드일 뿐입니다, 자유로운 형식으로 작성해보세요*</strong></h3><p><br></p><h3>기간 : 2023.00.00 - 2023.00.00</h3><p><br></p><h3>Overview ｜ 프로젝트 요약</h3><p>본인이 진행한 프로젝트에서 어떤 일을 진행했는지 알 수 있도록 간결하게 설명해주세요</p><p><br></p><h3>Role ｜ 역할</h3><p>해당 프로젝트에서 본인이 기여한 정도와 역할을 작성해 주세요.</p><p>기여도 : 00%</p><p><br></p><h3>Function ｜ 기능</h3><p> 작동 화면과 간단한 설명으로 프로젝트에서 구현한 기능에 대해서 설명해주세요.</p><p><br></p><p><br></p><h3>Result ｜ 성과</h3><p>해당 프로젝트의 성과를 작성해 주세요. 수치, 숫자로 성과를 표현할 수 있다면 설득력이 높아져요. 수치로 표현하기 어려운 성과라면 정성적인 성과도 괜찮아요.</p><p><br></p><p><br></p><h3>Lesson-Learned ｜ 프로젝트 후 배운 것</h3><p>모든 프로젝트가 성공하지 못했더라도, 배운 점은 있을 거예요. 해당 프로젝트에서 배운 점, 아쉬웠던 점, 개선할 수 있는 점을 적어서 다음 프로젝트 진행 시에 이를 보완할 수 있다는 것을 어필해 보세요.</p>';

  // 포트폴리오 정보
  const [portfolio, setPortfolio] = useState<postDto>({
    userId: Number(userId),
    title: '',
    gitLink: '',
    distributionLink: '',
    description: '',
    content: setting,
    skills: [],
  });

  // 전송 시 대표 이미지 파일
  const [img, setImg] = useState<File | null>(null);

  // 수신 시 대표 이미지 파일 url
  const representativeImgUrl = PortfolioInfo ? PortfolioInfo.representativeImgUrl : null;

  // const fileUrl = PortfolioInfo ? PortfolioInfo.fileUrl : '';

  // input,textinput 값에 대한 변경
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setPortfolio({ ...portfolio, [name]: value });
  };

  // tag 제거 함수
  const removeTags = (indexToRemove: number) => {
    setPortfolio({
      ...portfolio,
      skills: portfolio.skills.filter((it: string, index: number) => index !== indexToRemove),
    });
  };

  // tag 추가 함수
  const addTags = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const skill = event.currentTarget.value;

    if (portfolio.skills.includes(skill) || skill.length === 0) {
      console.log('Fail!');
      return;
    }
    event.currentTarget.value = '';
    setPortfolio({
      ...portfolio,
      skills: [...portfolio.skills, skill],
    });
  };

  // content 조작 함수
  const handleContent = (e: any) => {
    // console.log(e);
    setPortfolio({ ...portfolio, content: e });
  };

  // mutation을 이용한 서버 요청
  const { handlePatch } = usePatchPortfolio();
  const { handlePost } = usePostPortfolio();

  useEffect(() => {
    // portfolio 초기값 설정
    if (PortfolioInfo) {
      const { userId, title, gitLink, distributionLink, description, content, skills } =
        PortfolioInfo;
      const data: postDto = {
        userId,
        title,
        gitLink,
        distributionLink,
        description,
        content,
        skills,
      };
      setPortfolio(data);
    }
  }, [isEdit]);

  return (
    <S.PortfolioLayout>
      <UserBox name={name} profileImg={profileImg} />
      <TextBox text={'제목'} value={portfolio.title} name={'title'} onChange={handleInputChange} />
      <ImgBox
        text={'대표 사진'}
        img={img}
        setImg={setImg}
        representativeImgUrl={representativeImgUrl}
      />
      <TextBox
        text={'깃허브 링크'}
        value={portfolio.gitLink}
        name={'gitLink'}
        onChange={handleInputChange}
      />
      <TextBox
        text={'배포 링크'}
        value={portfolio.distributionLink}
        name={'distributionLink'}
        onChange={handleInputChange}
      />
      <TagBox
        text={'기술스택(업무 툴/스킬)'}
        tags={portfolio.skills}
        addTags={addTags}
        removeTags={removeTags}
      />
      <TextareaBox
        text={'프로젝트 소개글'}
        value={portfolio.description}
        name={'description'}
        onChange={handleInputChange}
      />
      <DetailBox text={'프로젝트 설명'} content={portfolio.content} setContent={handleContent} />
      <S.ButtonContainer>
        <S.PrevBtn onClick={backTo}>이전 페이지</S.PrevBtn>

        {
          // isEdit에 따라 버튼 결정
          isEdit ? (
            <S.SubmitBtn
              onClick={() =>
                handlePatch({
                  portfolioId: Number(portfolioId),
                  postDto: {
                    ...portfolio,
                  },
                  representativeImg: img,
                })
              }
            >
              수정 하기
            </S.SubmitBtn>
          ) : (
            <S.SubmitBtn
              onClick={() =>
                handlePost({
                  postDto: {
                    ...portfolio,
                  },
                  representativeImg: img,
                })
              }
            >
              작성 하기
            </S.SubmitBtn>
          )
        }
      </S.ButtonContainer>
    </S.PortfolioLayout>
  );
};

export default PortfolioContainer;
