// redux Hooks
import { useAppDispatch } from '../../hooks/reduxHook';
import { changeTheme } from '../../store/slice/themeSlice';
// styled-component
import * as S from '../header/Toggle.style';
import { Sun, Moon } from '../../components/common/icons';
import { useState } from 'react';

const Toggle = () => {
  const dispatch = useAppDispatch();
  const [icons, setIcons] = useState<boolean>(true);

  const handleToggle = () => {
    setIcons((pre) => !pre);
    dispatch(changeTheme());
  };

  return (
    <S.StyledToggle onClick={handleToggle}>
      {icons ? <Sun /> : <Moon />}
      <S.ToggleSwitch />
    </S.StyledToggle>
  );
};

export default Toggle;
