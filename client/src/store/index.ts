import { configureStore, combineReducers } from '@reduxjs/toolkit';
import themeReducer from '../store/slice/themeSlice';
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// reducer를 여기에 추가하시면 됩니다
const rootReducer = combineReducers({
  theme: themeReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  // theme Reducer만 persist 적용하기
  whitelist: ['theme'],
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
