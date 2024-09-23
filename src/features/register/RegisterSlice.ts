import {createSlice} from '@reduxjs/toolkit';

const registerSlice = createSlice({
  name: 'register',
  initialState: {
    registerUser:{},
  },
  reducers: {
    addRegisterUser: (state, action) => {
      state.registerUser = action.payload;
    },
  },
});

export const {addRegisterUser} = registerSlice.actions;

export default registerSlice.reducer;
