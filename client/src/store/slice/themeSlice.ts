import { createSlice } from '@reduxjs/toolkit';
import { THEME } from '../../constants/index';

type Theme = {
  theme: string;
};

const initialState: Theme = { theme: THEME.light };
const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    changeTheme(state) {
      console.log(state.theme);
      state.theme === THEME.light ? (state.theme = THEME.dark) : (state.theme = THEME.light);
    },
  },
});

export const { changeTheme } = themeSlice.actions;

export default themeSlice.reducer;
