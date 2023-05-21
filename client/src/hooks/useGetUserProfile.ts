import { useQuery } from '@tanstack/react-query';
import { GetUserProfile } from '../types';
import { UserProfileAPI } from '../api/client';
import { useNavigate } from 'react-router-dom';

const { getUserProfile } = UserProfileAPI;

export const useGetUserProfile = (userId: number) => {
  const navigate = useNavigate();
  const {
    isLoading: getUserProfileLoading,
    isError: getUserProfileError,
    data: UserProfile,
  } = useQuery<GetUserProfile, Error>({
    queryKey: ['userProfile', userId],
    queryFn: () => getUserProfile(userId),
    onError: () => {
      console.error('해당하는 유저를 찾을 수 없습니다.');
      navigate('/*');
    },
    retry: (failureCount, error) => {
      if (error.message === 'Request failed with status code 404') {
        return false;
      }
      return failureCount < 5;
    },
  });
  return { getUserProfileLoading, getUserProfileError, UserProfile };
};
