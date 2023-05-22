import * as S from './HelpModal.style';

type HelpModalProps = {
  isVisible: boolean;
};

function HelpModal({ isVisible }: HelpModalProps) {
  return (
    <S.Container className={isVisible ? 'visible' : ''}>
      <S.Title>문의하기</S.Title>
      <S.Description>
        문의사항이 있다면 <br /> 아래 이메일로 문의해 주세요.
      </S.Description>
      <S.Email href='mailto:ist200120@gmail.com'>ist200120@gmail.com</S.Email>
    </S.Container>
  );
}

export default HelpModal;
