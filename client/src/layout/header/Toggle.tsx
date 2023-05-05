// redux Hooks
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHook';
import { changeTheme } from '../../store/slice/themeSlice';
// styled-component
import * as S from '../header/Toggle.style';
import { Sun, Moon } from '../../components/common/icons';

const Toggle = () => {
  const dispatch = useAppDispatch();
  const themeIcon = useAppSelector((state) => state.theme.icon);

  const handleToggle = () => {
    dispatch(changeTheme());
  };

  return (
    <S.StyledToggle onClick={handleToggle}>
      {themeIcon ? <Sun /> : <Moon />}
      <S.ToggleSwitch />
    </S.StyledToggle>
  );
};

export default Toggle;
