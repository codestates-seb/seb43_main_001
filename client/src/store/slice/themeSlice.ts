import { THEME } from '../../constants/index';
import { createSlice } from '@reduxjs/toolkit';
type Theme = {
  theme: string;
};

const initialState: Theme = { theme: THEME.light };
const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    changeTheme(state) {
      state.theme === THEME.light ? (state.theme = THEME.dark) : (state.theme = THEME.light);
    },
  },
});

export const { changeTheme } = themeSlice.actions;

export default themeSlice.reducer;
