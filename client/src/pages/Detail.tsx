import * as S from './Detail.style';

// react component
import DetailTitle from '../components/Detail/DetailTitle';
import ProjectImg from '../components/Detail/ProjectImg';
import Description from '../components/Detail/Description';
import ProjectContent from '../components/Detail/ProjectContent';
import Comment from '../components/Detail/Comment';
import LikeBtn from '../components/Detail/LikeBtn';

// axios
import axios from 'axios';

// react hook
import { useEffect, useState } from 'react';

type portfolios = {
  portfolioId: number;
  userId: number;
  name: string;
  title: string;
  gitLink: string;
  distributionLink: string;
  description: string;
  content: string;
  views: number;
  createdAt: number[];
  updatedAt: number[];
};

function Detail() {
  // 타입 추가를 해야 한다?
  const [dummyData, setDummyData] = useState<portfolios | never>();
  // axios처리를 진행해야 겠다

  useEffect(() => {
    // 여기에서 axios 처리를 해야 겠다.
    axios
      .get(`${process.env.REACT_APP_API_URL}/portfolios/1`)
      .then((res) => {
        console.log('res', res);
        setDummyData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const { name, content, description, distributionLink, gitLink, title, views } = dummyData || {};

  return (
    <S.Container>
      <LikeBtn />
      <DetailTitle
        title={title}
        name={name}
        gitLink={gitLink}
        distributionLink={distributionLink}
      />
      <ProjectImg />
      <Description />
      <ProjectContent />
      <Comment />
    </S.Container>
  );
}

export default Detail;
