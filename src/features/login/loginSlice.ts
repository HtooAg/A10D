import {createSlice} from '@reduxjs/toolkit';

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    loginUser: {},
    
  },
  reducers: {
    addLoginUser: (state, action) => {
      state.loginUser = action.payload; // Correctly reference the nested structure
    },
  },
});

export const {addLoginUser} = loginSlice.actions;

export default loginSlice.reducer;
