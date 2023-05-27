import * as S from './DetailTitle.style';

// custom hooks
import { useRouter } from '../../hooks/useRouter';

// common
import ConfirmationModal from '../../components/common/ConfirmationModal';

// redux
import { useAppDispatch } from '../../hooks/reduxHook';
import { setOpen } from '../../store/slice/modalSlice';

// custom hook
import { useDeletePortfolio } from '../../hooks/useDeletePortfolio';

type LinkName = readonly [string, string];

type DetailTileProps = {
  auth: boolean;
  userId: number;
  title: string;
  name: string;
  gitLink: string;
  distributionLink: string;
  skills: string[];
  portfolioId: number;
  profileImg: string;
};
// 상세 페이지 포트폴리오 제목 및 사용자 정보
function DetailTitle({
  profileImg,
  auth,
  userId,
  name,
  title,
  gitLink,
  distributionLink,
  skills,
  portfolioId,
}: DetailTileProps) {
  const dispatch = useAppDispatch();

  const { handlePortfolioDelete } = useDeletePortfolio(portfolioId, userId);

  const { routeTo } = useRouter();

  const handleOnClickUserImg = () => {
    routeTo(`/User/${userId}`);
  };
  const handlePortfolioEditClick = () => {
    routeTo(`/EditPortfolio/${portfolioId}`);
  };

  const linkName: LinkName = ['깃헙링크', '배포링크'];
  return (
    <S.DetailTitle>
      <S.TitleUpper>
        <S.ProjectTitle>{title}</S.ProjectTitle>
        <S.UserInfo>
          <S.userImg src={profileImg} onClick={handleOnClickUserImg} />
          <S.userName>{name}</S.userName>
        </S.UserInfo>
      </S.TitleUpper>
      <S.TitleDowner>
        <S.Links>
          {linkName.map((name, idx) => {
            if (name === '깃헙링크') {
              return (
                <S.Link key={idx} darkGrey={true} href={`${gitLink}`}>
                  {name}
                </S.Link>
              );
            }
            return (
              <S.Link key={idx} href={`${distributionLink}`}>
                {name}
              </S.Link>
            );
          })}
        </S.Links>
        <S.Tags>
          {(skills ?? []).map((tag, idx) => {
            return <S.YellowTagCutsom key={idx}>{tag}</S.YellowTagCutsom>;
          })}
        </S.Tags>
      </S.TitleDowner>
      <S.UserInfoEdit>
        {auth ? (
          <S.EditBox>
            <S.Edit onClick={handlePortfolioEditClick}>수정</S.Edit>
            <S.Delete onClick={() => dispatch(setOpen(null))}>삭제</S.Delete>
            <ConfirmationModal
              title='포트폴리오를 삭제하시겠습니까?'
              text1='삭제를 진행하시면 입력한 모든 정보가 삭제되며,'
              text2='복구할 수 없게 됩니다.'
              text3='정말로 삭제하시겠습니까?'
              onClickHandler={handlePortfolioDelete}
              type='warning'
            ></ConfirmationModal>
          </S.EditBox>
        ) : null}
      </S.UserInfoEdit>
    </S.DetailTitle>
  );
}

export default DetailTitle;
