import React from 'react';
import * as S from './Main.style';

interface GeneralLayoutProps {
  children: React.ReactNode;
}

const Main: React.FC<GeneralLayoutProps> = ({ children }) => {
  return <S.Container>{children}</S.Container>;
};

export default Main;
