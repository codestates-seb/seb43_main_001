// api
import { tokenClient } from '../api/client';

// constant
import { URL } from '../constants/index';

const { refreshUrl } = URL;

export const getNewAccessToken = async () => {
  // 만약 REFRESH URL로 반환이 된다면 굳이 header에 authorization을 넣을 필요는 없다! 이미 위에서 그렇게 처리를 해줬기 때문에!
  const config = {
    params: {
      userId: 1,
    },
  };

  const response = await tokenClient.post('http://43.201.157.191:8080/auth/refresh', null, config);
  console.log(response.headers);
  const { accessToken } = response.data;

  return { accessToken };
};
