import {createSlice} from '@reduxjs/toolkit';

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    login: {
      loginUser: [],
    },
  },
  reducers: {
    addUser: (state, action) => {
      state.login.loginUser = action.payload; // Correctly reference the nested structure
    },
  },
});

export const {addUser} = loginSlice.actions;

export default loginSlice.reducer;
