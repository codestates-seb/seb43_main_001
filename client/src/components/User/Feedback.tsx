import * as S from './Feedback.style';
import { user } from './mock';

const Feedback = () => {
  return (
    <S.FeedbackContainer>
      <S.Feedbacks>
        {user.feedback.map((ele) => (
          <S.Feedback key={ele.id}>
            <p>{ele.text}</p>
            <S.FeedbackUser>
              <S.ImgBox>
                <img src={ele.img} />
              </S.ImgBox>
              <p>{ele.name}</p>
            </S.FeedbackUser>
          </S.Feedback>
        ))}
      </S.Feedbacks>
      <S.FeedbackAdd>
        <label htmlFor='feedback'></label>
        <input id='feedback' />
        <button>입력</button>
      </S.FeedbackAdd>
    </S.FeedbackContainer>
  );
};

export default Feedback;
