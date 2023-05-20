import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';

type Login = {
  isLogin: boolean;
  accessToken: string | null;
  refreshToken: string | null;
};

const initialState: Login = { isLogin: false, accessToken: null, refreshToken: null };
const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ accessToken: string; refreshToken: string }>) => {
      state.isLogin = true;
    },
    logout: (state, action: PayloadAction<null>) => {
      state.isLogin = false;
    },
  },
});

export const { login, logout } = loginSlice.actions;

export default loginSlice.reducer;
