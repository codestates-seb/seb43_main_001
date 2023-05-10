import * as S from './FeedbackContainer.style';
import { user } from './mock';
import Feedback from './Feedback';
import { useState } from 'react';

const FeedbackContainer = () => {
  const [selectFeedback, setSelectFeedback] = useState(true);
  const [category, setCategory] = useState(true);
  return (
    <S.FeedbackContainer>
      <S.SelectBtn>
        <button onClick={() => setSelectFeedback(true)} className={selectFeedback ? 'select' : ''}>
          받은 피드백
        </button>
        <button onClick={() => setSelectFeedback(false)} className={selectFeedback ? '' : 'select'}>
          작성한 피드백
        </button>
      </S.SelectBtn>
      {selectFeedback ? (
        <>
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
        </>
      ) : (
        <>
          <S.CategoryBtns>
            <button onClick={() => setCategory(true)} className={category ? 'select' : ''}>
              유저
            </button>
            <button onClick={() => setCategory(false)} className={category ? '' : 'select'}>
              포트폴리오
            </button>
          </S.CategoryBtns>
          {category ? (
            <S.Feedbacks>
              {user.toUser.map((ele) => (
                <Feedback key={ele.userCommentId} data={ele} />
              ))}
            </S.Feedbacks>
          ) : (
            <S.Feedbacks>
              {user.toPortfolio.map((ele) => (
                <Feedback key={ele.portfolioCommentId} data={ele} />
              ))}
            </S.Feedbacks>
          )}
        </>
      )}
    </S.FeedbackContainer>
  );
};

export default FeedbackContainer;
