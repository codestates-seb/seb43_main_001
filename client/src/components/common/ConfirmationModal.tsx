import * as S from './ConfirmationModal.style';
import { YellowBtn } from '../common/Button.style';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { setClose } from '../../store/slice/modalSlice';

// * : 실행 확인용 모달
// 모달을 사용하는 컴포넌트에서 => 'dispatch(setOpen(null));'로 모달창 오픈
// 줄바꿈을 위해 text1,2,3으로 구분(좋은 방법 생각나면 수정)
// onClickHandler : 확인 버튼을 눌렀을 때 실행되는 함수
// confirmation | warning => 버튼의 색상 구분, confirmation : 확인이 포인트 컬러, 취소가 일반 버튼 / warning : 확인이 일반 버튼, 취소가 포인트 컬러

type ModalProps = {
  title: string;
  text1: string;
  text2?: string;
  text3?: string;
  onClickHandler: () => void;
  type: 'confirmation' | 'warning';
};

const ConfirmationModal: React.FC<ModalProps> = ({
  title,
  text1,
  text2,
  text3,
  onClickHandler,
  type,
}) => {
  const dispatch = useDispatch();
  const onOff = useSelector((state: RootState) => {
    return state.modal.open;
  });
  const submitHandler = () => {
    onClickHandler();
    dispatch(setClose(null));
  };
  const cancleHandler = () => {
    dispatch(setClose(null));
  };
  return (
    <S.ModalBackground OnOff={onOff}>
      <S.ModalContainer>
        <S.Title>
          <h2>{title}</h2>
        </S.Title>
        <S.TextBox>
          <p>{text1}</p>
          {text2 && <p>{text2}</p>}
          {text3 && <p>{text3}</p>}
        </S.TextBox>
        {type === 'confirmation' ? (
          <S.BtnBox>
            <YellowBtn type='button' onClick={submitHandler}>
              확인
            </YellowBtn>
            <button type='button' onClick={cancleHandler}>
              취소
            </button>
          </S.BtnBox>
        ) : (
          <S.BtnBox>
            <button type='button' onClick={submitHandler}>
              확인
            </button>
            <YellowBtn type='button' onClick={cancleHandler}>
              취소
            </YellowBtn>
          </S.BtnBox>
        )}
      </S.ModalContainer>
    </S.ModalBackground>
  );
};

export default ConfirmationModal;
