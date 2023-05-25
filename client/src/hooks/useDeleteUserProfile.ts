import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UserProfileAPI } from '../api/client';

const { deleteUserProfile } = UserProfileAPI;

export const useDeleteUserProfile = (userId: number) => {
  const queryClient = useQueryClient();
  const { mutate: deleteUserProfileMutation } = useMutation(deleteUserProfile, {
    onError: (error) => {
      console.error(error);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(['userProfile', userId]);
    },
  });
  const handlerDeleteUserProfile = async (userId: number) => {
    deleteUserProfileMutation(userId);
  };
  return { handlerDeleteUserProfile };
};
