import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const listingSlice = createSlice({
  name: 'listingSlice',
  initialState,
  reducers: {},
});

export const listingReducer = listingSlice.reducer;
export const {} = listingSlice.actions;
