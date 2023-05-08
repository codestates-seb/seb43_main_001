import { useState } from 'react';
import * as S from './Feedback.style';

interface FeedbackProps {
  data: {
    text: string;
    img: string;
    name: string;
    createdAt: string;
  };
}

// TODO : 삭제 기능 구현
const Feedback: React.FC<FeedbackProps> = ({ data }) => {
  const [onEdit, setOnEdit] = useState<boolean>(false);

  return (
    <S.Feedback>
      <S.DelBtn />
      {!onEdit && <S.EditBtn onClick={() => setOnEdit(true)} />}
      {onEdit && <S.SubmitBtn onClick={() => setOnEdit(false)} />}
      {onEdit ? <textarea /> : <p>{data.text}</p>}
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
