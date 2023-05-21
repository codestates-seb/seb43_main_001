import { PayloadAction, createSlice } from '@reduxjs/toolkit';

// ! : state와 setState를 둘 다 props로 전달해야하는 문제 때문에 적용
// ! : 다른 더 좋은 방법을 발견하면 삭제
// ! : 다른 분들에게 Modal 기능을 사용하는지 물어보기(삭제 관련된 부분에서)
type ModalStatus = {
  open: boolean;
};

const initialState: ModalStatus = {
  open: false,
};

const ModalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setOpen: (state, action: PayloadAction<null>) => {
      state.open = true;
    },
    setClose: (state, action: PayloadAction<null>) => {
      state.open = false;
    },
  },
});

export const { setOpen, setClose } = ModalSlice.actions;

export default ModalSlice.reducer;
