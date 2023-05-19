import { useState } from 'react';
import * as S from './ArrowUp.style';

function ArrowUp() {
  const [showButton, setShowButton] = useState(false);

  const checkScrollDown = () => {
    if (!showButton && window.pageYOffset > 400) {
      setShowButton(true);
    } else if (showButton && window.pageYOffset <= 400) {
      setShowButton(false);
    }
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  window.addEventListener('scroll', checkScrollDown);

  return (
    <S.ArrowUpWrapper onClick={scrollTop} className={showButton ? 'visible' : ''}>
      <S.ArrowUpIcon />
    </S.ArrowUpWrapper>
  );
}

export default ArrowUp;
