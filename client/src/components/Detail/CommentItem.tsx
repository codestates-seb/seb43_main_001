import * as S from './CommentItem.style';

// react hooks
import { useState } from 'react';

// react-query
import { useMutation, useQueryClient } from '@tanstack/react-query';

// axios
import axios from 'axios';

type CommentItemProps = {
  portfolioId: number;
  portfolioCommentId: number;
  userId: number;
  content: string;
  createdAt: string;
  userName: string;
};

// 상세 페이지 포트폴리오 댓글 아이템 컴포넌트
function CommentItem({
  content,
  createdAt,
  userName,
  userId,
  portfolioCommentId,
  portfolioId,
}: CommentItemProps) {
  const [onEdit, setOnEdit] = useState<boolean>(false);
  const [editInput, setEditInput] = useState<string>('');

  const queryClient = useQueryClient();

  // types에 따로 지정해야 함!
  const patchComment = {
    portfolioCommentId,
    userName,
    portfolioId,
    content: editInput,
  };

  const upDateMutation = useMutation({
    // 위 타입을 지정해줘야 함!
    mutationFn: (patchComment: any) => {
      return axios.patch(`http://localhost:3003/data/${userId}`, {
        ...patchComment,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['comment']);
    },
    onError: (error) => {
      // *: error 헨들링 하기
      console.log(error);
    },
  });

  // ?: 에러 처리를 userId 값으로 처리해야 함!
  const handleComfirm = () => {
    // 여기에서 useMutation을 진행하면 될듯 하다.(comment에 patch를 진행한다)
    // editInput값을 input으로 patch를 진행한다.(userId로 수정을 해야 하나?)
    // 그럼 props로 userId를 받아야 할 수도 있음 참고해라!patch까지 진행하자
    // isAuth를 통해 수정 삭제 버튼들을 보일 수 있다.

    upDateMutation.mutate(patchComment);
    setOnEdit(false);
  };

  const handleEditArea = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditInput(event.target.value);
  };

  return (
    <S.Container>
      <S.Update>
        <S.DelBtn />
        {!onEdit && <S.EditBtn onClick={() => setOnEdit(true)} />}
        {onEdit && <S.ComfirmBtn onClick={handleComfirm} />}
      </S.Update>
      {onEdit ? (
        <S.EditArea
          placeholder='Enter your comment here'
          value={editInput}
          onChange={handleEditArea}
        />
      ) : (
        <S.Content>{content}</S.Content>
      )}
      <S.CreateAt>
        {createdAt} {userName}
      </S.CreateAt>
    </S.Container>
  );
}

export default CommentItem;
