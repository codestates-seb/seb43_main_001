import React, { useState } from 'react';
import PortfolioContainer from '../components/Portfolio/PortfolioContainer';
import * as S from './EditPortfolio.style';

function EditPortfolio() {
  return (
    <S.EditPortfolioContainer>
      <PortfolioContainer isEdit={true} />
    </S.EditPortfolioContainer>
  );
}

export default EditPortfolio;
