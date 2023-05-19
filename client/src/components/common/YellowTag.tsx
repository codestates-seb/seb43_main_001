import * as S from './YellowTag.style';

type TagProps = {
  children: string;
};

function YellowTag({ children }: TagProps) {
  return <S.Tags>{children}</S.Tags>;
}

export default YellowTag;
