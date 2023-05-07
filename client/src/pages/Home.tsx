import { useRouter } from '../hooks/useRouter';
import Banner from '../components/Home/Banner';
import Sort from '../components/Home/Sort';
import Search from '../components/Home/Search';
import Card from '../components/common/Card';
import ArrowUp from '../components/Home/ArrowUp';
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
      <Banner />
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
