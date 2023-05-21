import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PatchUserProfile } from '../types';
import { UserProfileAPI } from '../api/client';

const { patchUserProfile } = UserProfileAPI;

export const usePatchUserProfile = (userId: number) => {
  const queryClient = useQueryClient();
  const { mutate: patchUserProfileMutation } = useMutation(patchUserProfile, {
    onMutate: () => {
      console.log('onMutate');
    },
    onError: (e) => {
      console.log(e);
    },
    onSuccess: (data) => {
      console.log(data, 'success');
      queryClient.invalidateQueries(['userProfile', userId]);
    },
    onSettled: () => {
      console.log('end');
    },
  });
  const handlerPatchProfile = async ({
    userId,
    name,
    profileImg,
    gitLink,
    blogLink,
    jobStatus,
    about,
  }: PatchUserProfile) => {
    patchUserProfileMutation({
      userId,
      name,
      profileImg,
      gitLink,
      blogLink,
      jobStatus,
      about,
    });
  };
  return { patchUserProfileMutation, handlerPatchProfile };
};
