// react-query
import { useMutation } from '@tanstack/react-query';

// api
import { postCheckEmail } from '../api/client';
import { toast } from 'react-toastify';

export const usePostCheckEmail = () => {
  const { mutate: CheckEmail } = useMutation({
    mutationFn: postCheckEmail,
    onSuccess: (data) => {
      if (!data.data) {
        toast.info('가입 가능한 이메일입니다!');
      } else {
        toast.info('이미 존재하는 이메일입니다!');
      }
    },
  });

  const handleCheckEmail = (email: string) => {
    CheckEmail(email);
  };

  return { handleCheckEmail };
};
