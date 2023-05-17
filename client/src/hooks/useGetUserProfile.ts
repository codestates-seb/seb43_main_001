import { useQuery } from '@tanstack/react-query';
import { GetUserProfile } from '../types';
import { UserProfileAPI } from '../api/client';
import { useNavigate } from 'react-router-dom';

const { getUserProfile } = UserProfileAPI;

export const useGetUserProfile = (userId: number) => {
  const navigate = useNavigate();
  const {
    isLoading: getUserInfoLoading,
    isError: getUserInfoError,
    data: UserInfo,
  } = useQuery<GetUserProfile, Error>({
    queryKey: ['userInfo'],
    queryFn: () => getUserProfile(userId),
    onError: () => {
      console.error('해당하는 유저를 찾을 수 없습니다.');
      navigate('/*');
    },
  });
  return { getUserInfoLoading, getUserInfoError, UserInfo };
};
