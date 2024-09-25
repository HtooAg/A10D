import {createSlice} from '@reduxjs/toolkit';

const resetSlice = createSlice({
  name: 'reset',
  initialState: {
    resetUser: {},
  },
  reducers: {
    addResetUser: (state, action) => {
      state.resetUser = action.payload;
    },
  },
});

export const {addResetUser} = resetSlice.actions;

export default resetSlice.reducer;
