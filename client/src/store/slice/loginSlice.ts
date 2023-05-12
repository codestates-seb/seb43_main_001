import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    logout: (state, action: PayloadAction<null>) => {
      state.isLogin = false;
      state.accessToken = null;
      state.refreshToken = null;
    },
  },
});

export const { login, logout } = loginSlice.actions;

export default loginSlice.reducer;
