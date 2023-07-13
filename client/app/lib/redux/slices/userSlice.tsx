import { createSlice } from '@reduxjs/toolkit';
import { IUserSlice } from '../../interfaces/store.interface';

const initialState: IUserSlice = {
  email: '',
  username: '',
  password: '',
  role: '',
};

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {},
});

export const userReducer = userSlice.reducer;
export const {} = userSlice.actions;
