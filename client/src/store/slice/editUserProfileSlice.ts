import { createSlice } from '@reduxjs/toolkit';

// ! : 현재 유저 수정 컴포넌트가 나뉘어있기 때문에 사용.
// ! : 다른 방법을 발견하면 삭제 예정.
type UserInfo = {
  name: string;
  profileImg: string;
  about: string;
  jobStatus: string;
  gitLink: string;
  blogLink: string;
};

const initialState: UserInfo = {
  name: '',
  profileImg: '',
  about: '',
  jobStatus: '',
  gitLink: '',
  blogLink: '',
};

const editUserProfileSlice = createSlice({
  name: 'editUserProfile',
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setImg: (state, action) => {
      console.log(action.payload);
      state.profileImg = action.payload;
    },
    setAbout: (state, action) => {
      if (action.payload) {
        state.about = action.payload;
      } else {
        state.about = '';
      }
    },
    setJobStatus: (state, action) => {
      if (action.payload) {
        state.jobStatus = action.payload;
      } else {
        state.jobStatus = 'JOB_SEEKING';
      }
    },
    setGit: (state, action) => {
      action.payload ? (state.gitLink = action.payload) : (state.gitLink = '');
    },
    setBlog: (state, action) => {
      action.payload ? (state.blogLink = action.payload) : (state.blogLink = '');
    },
  },
});

export const { setName, setImg, setAbout, setJobStatus, setGit, setBlog } =
  editUserProfileSlice.actions;

export default editUserProfileSlice.reducer;
