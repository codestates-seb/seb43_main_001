import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './reduxHook';
import { login } from '../store/slice/loginSlice';
import { useRouter } from './useRouter';

export function useAuth() {
  const dispatch = useAppDispatch();
  const isLogin = useAppSelector((state) => state.login.isLogin);
  const { routeTo } = useRouter();

  useEffect(() => {
    if (!isLogin) {
      const currentURL = document.location.search;
      const params = new URLSearchParams(currentURL);

      const accessToken = params.get('access_token');
      const refreshToken = params.get('refresh_token');

      if (accessToken && refreshToken) {
        dispatch(login({ accessToken, refreshToken }));
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        routeTo('/');
      }
    }
  }, []);
}
