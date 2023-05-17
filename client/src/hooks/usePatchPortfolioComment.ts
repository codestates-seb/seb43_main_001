// react-query
import { useMutation, useQueryClient } from '@tanstack/react-query';

// api
import { PortfolioCommentAPI } from '../api/client';

const { patchPortfolioComment } = PortfolioCommentAPI;

type usePatchPortfolioCommentParams = {
  userId: number;
  portfolioCommentId: number;
  portfolioId: number;
};

export const usePatchPortfolioComment = ({
  portfolioCommentId,
  userId,
  portfolioId,
}: usePatchPortfolioCommentParams) => {
  const queryClient = useQueryClient();

  const { mutate: PatchComment } = useMutation({
    mutationFn: patchPortfolioComment,
    onSuccess: () => {
      // setqueryDAta[comment,protido.id];
      // !: 옵션 추가 및 다른 것으로 수정해야 함!
      queryClient.invalidateQueries(['comment']);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const patchCommentAction = (content: string) => {
    // !:Auth만 추가되면 굳이 분기처리를 안 해도 될듯!
    PatchComment({ portfolioCommentId, userId, portfolioId, content });
  };

  return { patchCommentAction };
};
