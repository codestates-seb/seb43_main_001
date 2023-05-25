import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PatchUserProfile } from '../types';
import { UserProfileAPI } from '../api/client';

const { patchUserProfile } = UserProfileAPI;

export const usePatchUserProfile = (userId: number) => {
  const queryClient = useQueryClient();
  const { mutate: patchUserProfileMutation } = useMutation(patchUserProfile, {
    onError: (error) => {
      console.error(error);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(['userProfile', userId]);
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
