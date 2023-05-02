import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHook';
import { changeTheme } from '../../store/slice/themeSlice';

function Header() {
  const currentTheme = useAppSelector((state) => state.theme);
  console.log(currentTheme);
  const dispatch = useAppDispatch();
  const themeHandler = () => {
    dispatch(changeTheme());
  };
  return (
    <Head>
      <button onClick={themeHandler}>{currentTheme}</button>
    </Head>
  );
}

const Head = styled.section`
  width: 100%;
  height: 30px;
  border: 1px solid black;
  /* position: fixed ;
  top: 0; */
`;

export default Header;
