import { useState } from 'react';
import * as S from './Feedback.style';

type FeedbackProps = {
  data: {
    content: string;
    img: string;
    name: string;
    createdAt: string;
    userId?: number;
    portfolioId?: number;
  };
};

// TODO : 삭제 기능 구현
const Feedback: React.FC<FeedbackProps> = ({ data }) => {
  const [onEdit, setOnEdit] = useState<boolean>(false);

  return (
    <S.Feedback>
      <S.DelBtn />
      {!onEdit && <S.EditBtn onClick={() => setOnEdit(true)} />}
      {onEdit && <S.SubmitBtn onClick={() => setOnEdit(false)} />}
      {onEdit ? <textarea /> : <p>{data.content}</p>}
      {/* 해당 유저/포트폴리오 페이지로 이동 */}
      {data.userId && !data.portfolioId && <S.LinkIcon />}
      {data.portfolioId && <S.LinkIcon />}
      <S.FeedbackUser>
        <span>{new Date(data.createdAt).toLocaleDateString()}</span>
        <S.ImgBox>
          <img src={data.img} />
        </S.ImgBox>
        <p>{data.name}</p>
      </S.FeedbackUser>
    </S.Feedback>
  );
};

export default Feedback;
