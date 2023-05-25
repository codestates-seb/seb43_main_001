import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UserProfileAPI } from '../api/client';

const { deleteUserProfile } = UserProfileAPI;

export const useDeleteUserProfile = (userId: number) => {
  const queryClient = useQueryClient();
  const { mutate: deleteUserProfileMutation } = useMutation(deleteUserProfile, {
    onMutate: () => {
      console.log('onMutate');
    },
    onError: (e) => {
      console.log(e);
    },
    onSuccess: (data) => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      queryClient.invalidateQueries(['userProfile', userId]);
    },
    onSettled: () => {
      console.log('end');
    },
  });
  const handlerDeleteUserProfile = async (userId: number) => {
    deleteUserProfileMutation(userId);
  };
  return { handlerDeleteUserProfile };
};
