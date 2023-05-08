import * as S from './FeedbackContainer.style';
import { user } from './mock';
import Feedback from './Feedback';

const FeedbackContainer = () => {
  return (
    <S.FeedbackContainer>
      <S.Feedbacks>
        {user.feedback.map((ele) => (
          <Feedback key={ele.id} data={ele} />
        ))}
      </S.Feedbacks>
      <S.FeedbackAdd>
        <label htmlFor='feedback'></label>
        <textarea id='feedback' />
        <S.Secret htmlFor='secret'>
          <span>비밀글</span>
          <input type='checkbox' id='secret' />
        </S.Secret>
        <button>입력</button>
      </S.FeedbackAdd>
    </S.FeedbackContainer>
  );
};

export default FeedbackContainer;
