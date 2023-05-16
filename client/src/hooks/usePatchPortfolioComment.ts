// react-query
import { useMutation, useQueryClient } from '@tanstack/react-query';

// types
import { PatchPortfolioComment } from '../types';

// react hook
import { useState } from 'react';

// axios
import axios from 'axios';

type usePatchPortfolioCommentProps = {
  portfoliocommentId: string;
  PatchData: PatchPortfolioComment;
};

export const usePatchPortfolioComment = ({
  portfoliocommentId,
  PatchData,
}: usePatchPortfolioCommentProps) => {
  const [patchLoading, setPatchLoading] = useState<boolean>(false);

  // !: API 파일로 이동해야 함
  const PatchCommentData = async (portfoliocommentId: string) => {
    return await axios.patch(
      `${process.env.REACT_APP_API_URL}/api/portfoliocomments/${portfoliocommentId}`,
      PatchData,
    );
  };

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: PatchCommentData,
    onSuccess: () => {
      // setqueryDAta[comment,protido.id];
      queryClient.invalidateQueries(['comment']);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return { mutate };
};
