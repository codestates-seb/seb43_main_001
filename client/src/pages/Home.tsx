import styled from 'styled-components';
import { useRouter } from '../hooks/useRouter';
function Home() {
  const { routeTo } = useRouter();
  const testRouter = () => {
    console.log('aaaaaaaa');
    routeTo('/Detail');
  };
  return (
    <div>
      Home
      <button onClick={testRouter}></button>
    </div>
  );
}

export default Home;
