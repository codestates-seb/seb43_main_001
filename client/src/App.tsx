// style
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './style/GlobalStyle';

// theme
import { darkTheme, lightTheme } from './style/theme';

// route
import { routers } from './router';
import { RouterProvider } from 'react-router-dom';

// constants
import { THEME } from './constants/index';

// redux
import { useAppSelector } from './hooks/reduxHook';

function App() {
  const themeMode = useAppSelector((state) => state.theme.theme);
  const theme = themeMode === THEME.light ? lightTheme : darkTheme;

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <RouterProvider router={routers} />
      </ThemeProvider>
    </>
  );
}

export default App;
