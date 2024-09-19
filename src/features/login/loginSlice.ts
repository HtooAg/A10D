import {createSlice} from '@reduxjs/toolkit';

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    loginUser: [],
  },
  reducers: {
    addUser: (state, action) => {
      state.loginUser = action.payload;
    },
  },
});



export const {addUser} = loginSlice.actions;

export default loginSlice.reducer;
