import React, { useState } from 'react';
import NewPortfolioContainer from '../components/Portfolio/NewPortfolioContainer';
import * as S from './Portfolio.style';

function Portfolio() {
  return (
    <S.PortfolioContainer>
      <NewPortfolioContainer />
    </S.PortfolioContainer>
  );
}

export default Portfolio;
