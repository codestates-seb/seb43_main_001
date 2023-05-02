import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '../store/slice/themeSlice';
const store = configureStore({
  reducer: themeReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
