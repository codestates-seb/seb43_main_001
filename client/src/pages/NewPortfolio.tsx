import React, { useState } from 'react';
import PortfolioContainer from '../components/Portfolio/PortfolioContainer';
import * as S from './NewPortfolio.style';

function NewPortfolio() {
  return (
    <S.NewPortfolioContainer>
      <PortfolioContainer isEdit={false} />
    </S.NewPortfolioContainer>
  );
}

export default NewPortfolio;
