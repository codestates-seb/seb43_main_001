// react-query
import { useMutation } from '@tanstack/react-query';

// axios
import { AxiosError } from 'axios';

// api
import { userAPI } from '../api/client';
import { useAppSelector, useAppDispatch } from '../hooks/reduxHook';
import { login } from '../store/slice/loginSlice';

// types
import { Login } from '../types/index';

// custom hook
import { useRouter } from './useRouter';

// toast
import { toast } from 'react-toastify';

const { postLogin } = userAPI;

export const usePostUserLogin = () => {
  const { routeTo } = useRouter();
  const dispatch = useAppDispatch();
  const isLogin = useAppSelector((state) => state.login.isLogin);
  const { mutate: postUserLogin } = useMutation({
    // alert들은 toast library로 대체하기!
    mutationFn: postLogin,
    onSuccess: (data) => {
      // 로그인 처리
      const accessToken = data.headers.authorization;
      const refreshToken = data.headers.refresh;
      if (accessToken) {
        dispatch(login({ accessToken, refreshToken }));
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
      }

      toast.success('성공적으로 로그인 되셨습니다');
      return routeTo('/');
    },
    onError: (error: AxiosError) => {
      return toast.error('로그인이 실패했습니다');
    },
  });

  const postUserInfoLogin = ({ username, password }: Login) => {
    postUserLogin({ username, password });
  };

  return { postUserInfoLogin };
};
