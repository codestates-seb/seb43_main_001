// ! : 유저 정보를 patch하기 위해선 react-toolkit의 정보가 필요(훅 사용 해야 함)

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getUserIdFromAccessToken } from '../utils/getUserIdFromAccessToken';
import { useAppSelector } from './reduxHook';
import { PatchUserProfile } from '../types';
import { UserProfileAPI } from '../api/client';

const { patchUserProfile } = UserProfileAPI;

export const usePatchUserProfile = () => {
  const token = useAppSelector((state) => state.login.accessToken);
  const isLogin = useAppSelector((state) => state.login.isLogin);

  const userId = getUserIdFromAccessToken(isLogin, token);

  const queryClient = useQueryClient();
  const { mutate: patchProfile } = useMutation({
    mutationFn: patchUserProfile,
    onSuccess: () => {
      queryClient.invalidateQueries(['profile']);
    },
    onError: (e) => {
      console.log(e);
    },
  });
  const patchProfileAction = (
    userId: number,
    name: string,
    profileImg: string,
    gitLink: string,
    blogLink: string,
    jobStatus: string,
    about: string,
  ) => {
    patchProfile;
  };
};
