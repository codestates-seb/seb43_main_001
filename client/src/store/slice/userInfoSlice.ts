import { createSlice } from '@reduxjs/toolkit';

// ! : 현재 유저 수정 컴포넌트가 나뉘어있기 때문에 사용.
// ! : 다른 방법을 발견하면 삭제 예정.
type UserInfo = {
  name: string;
  profileImg: File | null;
  about: string;
  jobStatus: string;
  blogLink: string;
};

const initialState: UserInfo = {
  name: '',
  profileImg: null,
  about: '',
  jobStatus: '',
  blogLink: '',
};
const UserInfoSlice = createSlice({
  name: 'userinfo',
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setImg: (state, action) => {
      state.profileImg = action.payload;
    },
    setAbout: (state, action) => {
      state.about = action.payload;
    },
    setJobStatus: (state, action) => {
      state.jobStatus = action.payload;
    },
    setBlog: (state, action) => {
      state.blogLink = action.payload;
    },
  },
});

export const { setName, setImg, setAbout, setJobStatus, setBlog } = UserInfoSlice.actions;

export default UserInfoSlice.reducer;
