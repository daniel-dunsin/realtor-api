import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserSlice } from '../../interfaces/store.interface';
import { setTokenStorage, setUserStorage } from '../../utils/localStorage';
import { login, register } from '../thunks/authThunk';

const initialState: IUserSlice = {
  _id: '',
  email: '',
  username: '',
  password: '',
  role: '',
};

const userSlice = createSlice({
  name: 'userSlice',

  initialState,

  reducers: {
    updateUser: (state: IUserSlice, action: PayloadAction<IUserSlice>) => {
      return action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state: IUserSlice, action) => {
        setTokenStorage(action.payload.token);
        setUserStorage(action.payload.user);
        return action.payload.user;
      })

      .addCase(login.fulfilled, (state: IUserSlice, action) => {
        setTokenStorage(action.payload.token);
        setUserStorage(action.payload.user);
        return action.payload.user;
      });
  },
});

export const userReducer = userSlice.reducer;

export const { updateUser } = userSlice.actions;
