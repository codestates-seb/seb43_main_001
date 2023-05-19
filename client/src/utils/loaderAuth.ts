import { redirect } from 'react-router-dom';

export const checkAuth = () => {
  const token = localStorage.getItem('accessToken');

  if (!token) {
    return redirect('/Login');
  }

  return null;
};

export const preventLoginPage = () => {
  const token = localStorage.getItem('accessToken');

  if (token) {
    return redirect('/');
  }

  return null;
};
