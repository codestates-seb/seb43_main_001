import { createSlice } from '@reduxjs/toolkit';

type Login = {
  isLogin: boolean;
  token: string | null;
};

const initialState: Login = { isLogin: false, token: null };
const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLogin = true;
      state.token = action.payload;
    },
    logout: (state, action) => {
      state.isLogin = false;
      state.token = null;
    },
  },
});

export const { login, logout } = loginSlice.actions;

export default loginSlice.reducer;
