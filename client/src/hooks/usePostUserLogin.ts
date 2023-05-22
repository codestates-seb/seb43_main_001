// react-query
import { useMutation } from '@tanstack/react-query';

// axios
import { AxiosError } from 'axios';

// api
import { userAPI } from '../api/client';

// types
import { Login } from '../types/index';

// custom hook
import { useRouter } from './useRouter';

// toast
import { toast } from 'react-toastify';

const { postLogin } = userAPI;

export const usePostUserLogin = () => {
  const { routeTo } = useRouter();
  const { mutate: postUserLogin } = useMutation({
    // alert들은 toast library로 대체하기!
    mutationFn: postLogin,
    onSuccess: () => {
      return toast.success('성공적으로 로그인 되셨습니다');
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 409) {
        return toast.error('이미 가입하셨습니다');
      }
      return toast.error('로그인이 실패했습니다');
    },
  });

  const postUserInfoLogin = ({ username, password }: Login) => {
    postUserLogin({ username, password });
  };

  return { postUserInfoLogin };
};
