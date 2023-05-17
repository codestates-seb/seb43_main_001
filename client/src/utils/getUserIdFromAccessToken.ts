import jwtDecode from 'jwt-decode';

// !: types로 이동해야 함!
type MyToken = {
  userId: number;
  exp: number;
  iat: number;
};

export const getUserIdFromAccessToken = (isLogin: boolean, token: string | null) => {
  // console.log(isLogin, typeof token);
  if (token !== null && isLogin) {
    console.log(jwtDecode<MyToken>(token));
    return jwtDecode<MyToken>(token).userId;
  }
};
