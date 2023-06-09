import { configureStore, combineReducers } from '@reduxjs/toolkit';
import themeReducer from '../store/slice/themeSlice';
import loginReducer from '../store/slice/loginSlice';
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import editUserProfileReducer from './slice/editUserProfileSlice';
import modalReducer from './slice/modalSlice';

// reducer를 여기에 추가하시면 됩니다
const rootReducer = combineReducers({
  theme: themeReducer,
  login: loginReducer,
  editUserProfile: editUserProfileReducer,
  modal: modalReducer,
});

const persistConfig = {
  key: 'root',
  storage,

  // persist 적용하기
  whitelist: ['theme', 'login', 'editUserProfile', 'modal'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
