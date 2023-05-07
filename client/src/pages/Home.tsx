import { useRouter } from '../hooks/useRouter';
import Sort from '../components/Home/Sort';
import Search from '../components/Home/Search';
import ArrowUp from '../components/Home/ArrowUp';
import Card from '../components/common/Card';
import { YellowBtn } from '../components/common/button';
import * as S from './Home.style';

// 임시 데이터
const data = [0, 1, 2, 3, 4, 5];

function Home() {
  const { routeTo } = useRouter();
  // const testRouter = () => {
  //   console.log('aaaaaaaa');
  //   routeTo('/Detail');
  // };

  return (
    <S.Container>
      <S.Banner>
        <h1>이름</h1>
        <p>설명입니다설명입니다설명입니다설명입니다</p>
        <YellowBtn>공유하기</YellowBtn>
      </S.Banner>
      <Sort />
      <S.ContentWrapper>
        <Search />
        <S.CardWrapper>
          {data.map((item) => (
            <Card key={item} />
          ))}
        </S.CardWrapper>
        <ArrowUp />
      </S.ContentWrapper>
    </S.Container>
  );
}

export default Home;
