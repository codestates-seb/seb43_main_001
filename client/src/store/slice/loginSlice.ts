import { createSlice } from '@reduxjs/toolkit';

type Login = {
  isLogin: boolean;
};

const initialState: Login = { isLogin: false };
const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    login: (state) => {
      state.isLogin = true;
    },
    logout: (state) => {
      state.isLogin = false;
    },
  },
});

export const { login, logout } = loginSlice.actions;

export default loginSlice.reducer;
