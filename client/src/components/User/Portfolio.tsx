import * as S from './Portfolio.style';
import Card from '../common/Card';
import Sort from '../Home/Sort';

const data = [1, 2, 3, 4, 5, 6];
const Portfolio = () => {
  return (
    <>
      {/* <S.PortfolioBtns>
        <button>최신순</button>
        <button>추천순</button>
        <button>조회순</button>
      </S.PortfolioBtns> */}
      <S.UserSort>
        <Sort />
      </S.UserSort>
      <S.PortfolioContainer>
        {data.map((ele) => (
          <Card key={ele} />
        ))}
      </S.PortfolioContainer>
    </>
  );
};

export default Portfolio;
