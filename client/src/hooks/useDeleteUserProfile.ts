import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UserProfileAPI } from '../api/client';

const { deleteUserProfile } = UserProfileAPI;

export const useDeleteUserProfile = () => {
  // const queryClient = useQueryClient();
  const { mutate: deleteUserProfileMutation } = useMutation(deleteUserProfile, {
    onMutate: () => {
      console.log('onMutate');
    },
    onError: (e) => {
      console.log(e);
    },
    onSuccess: (data) => {
      console.log(data, 'success');
      // queryClient.invalidateQueries(['userProfile', userId]);
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
