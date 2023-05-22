// react-query
import { useMutation } from '@tanstack/react-query';

// axios
import { AxiosError } from 'axios';

// api
import { userAPI } from '../api/client';

// types
import { SignUp } from '../types/index';

// custom hook
import { useRouter } from './useRouter';

// toast
import { toast } from 'react-toastify';

const { postSignUp } = userAPI;

export const usePostUserSignUp = () => {
  const { routeTo } = useRouter();
  const { mutate: postUserSignUp } = useMutation({
    // alert들은 toast library로 대체하기!
    mutationFn: postSignUp,
    onSuccess: () => {
      toast.success('성공적으로 가입 되셨습니다');
      return routeTo('/Login');
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 409) {
        return toast.error('이미 가입하셨습니다');
      }
      return toast.error('회원가입이 실패했습니다');
    },
  });

  const postUserInfoSignUp = ({ name, password, email }: SignUp) => {
    postUserSignUp({ name, password, email });
  };

  return { postUserInfoSignUp };
};
