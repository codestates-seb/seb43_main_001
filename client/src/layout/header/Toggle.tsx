// redux Hooks
import { useAppDispatch } from '../../hooks/reduxHook';
import { changeTheme } from '../../store/slice/themeSlice';
// styled-component
import * as S from '../header/Toggle.style';

const Toggle = () => {
  const dispatch = useAppDispatch();

  const handleToggle = () => {
    dispatch(changeTheme());
  };

  return (
    <S.StyledToggle onClick={handleToggle}>
      <S.ToggleSwitch />
    </S.StyledToggle>
  );
};

export default Toggle;
