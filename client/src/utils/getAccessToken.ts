// api
import { tokenClient } from '../api/client';

//
import { useEffect, useState } from 'react';

// toast
import { toast } from 'react-toastify';

export const getNewAccessToken = () => {
  const [accessToken, setAccessToken] = useState<string>('');
  // 만약 REFRESH URL로 반환이 된다면 굳이 header에 authorization을 넣을 필요는 없다! 이미 위에서 그렇게 처리를 해줬기 때문에!

  useEffect(() => {
    tokenClient
      .post('auth/refresh')
      .then((response) => {
        setAccessToken(response.headers.authorization);
      })
      .catch((error) => {
        if (error.response?.status === 403) {
          toast.error('다시 로그인 하세요');
        }
      });
  }, [accessToken]);

  return { accessToken };
};
