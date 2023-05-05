import { THEME } from '../../constants/index';
import { createSlice } from '@reduxjs/toolkit';

type Theme = {
  theme: string;
  icon: boolean;
};

const initialState: Theme = { theme: THEME.light, icon: true };
const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    changeTheme(state) {
      state.theme === THEME.light ? (state.theme = THEME.dark) : (state.theme = THEME.light);
      state.icon = !state.icon;
    },
  },
});

export const { changeTheme } = themeSlice.actions;

export default themeSlice.reducer;
