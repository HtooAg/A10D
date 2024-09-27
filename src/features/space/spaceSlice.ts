import {createSlice} from '@reduxjs/toolkit';

const spaceSlice = createSlice({
  name: 'spaceId',
  initialState: {
    spaceUser: {},
  },
  reducers: {
    addSpaceId: (state, action) => {
      state.spaceUser = action.payload;
    },
  },
});

export const {addSpaceId} = spaceSlice.actions;

export default spaceSlice.reducer;
