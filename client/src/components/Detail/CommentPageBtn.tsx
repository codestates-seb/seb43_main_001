import * as S from './CommentPageBtn.style';

type CommentPageBtnProps = {
  pageNumber: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

const CommentPageBtn = ({ pageNumber, setPage }: CommentPageBtnProps) => {
  return <S.PageBtn onClick={() => setPage(pageNumber)}>{pageNumber}</S.PageBtn>;
};

export default CommentPageBtn;
