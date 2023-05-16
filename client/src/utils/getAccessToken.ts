// api
import { tokenClient } from '../api/client';

// redux
import { useAppSelector, useAppDispatch } from '../hooks/reduxHook';
import { login } from '../store/slice/loginSlice';

// !: 추후에 constant에서 import 후 처리를 해야 한다
const REFRESH_URL = '';

// const dispatch = useAppDispatch();

export const getNewAccessToken = async () => {
  // 만약 REFRESH URL로 반환이 된다면 굳이 header에 authorization을 넣을 필요는 없다! 이미 위에서 그렇게 처리를 해줬기 때문에!
  const response = await tokenClient.post('https://example.com/api/token/refresh');

  // 일반적으로 response.data 또는 response.data.accessToken과 같이 작성합니다.
  const { accessToken } = response.data;

  // 새로 발급된 accessToken을 반환합니다.
  return { accessToken };
};
