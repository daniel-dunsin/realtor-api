import { http } from '@/axios.config';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ILogin, IRegister } from '../../interfaces/thunks.interface';
import { errorHandler } from '../../utils/errorHandler';
import { errorRes, loadingRes, successRes } from '../../utils/toast';

export const register: any = createAsyncThunk(
  'auth/register',
  async (data: IRegister, thunkApi) => {
    try {
      const response = await http.post('/auth/register', data);

      successRes('Account Created Successfully');

      return response.data;
    } catch (error) {
      errorRes(errorHandler(error));

      return thunkApi.rejectWithValue(errorHandler(error));
    }
  }
);

export const login: any = createAsyncThunk(
  'auth/login',
  async (data: ILogin, thunkApi) => {
    try {
      const response = await http.post('/auth/login', data);

      successRes('Welcome back!');

      return response.data;
    } catch (error) {
      errorRes(errorHandler(error));

      return thunkApi.rejectWithValue(errorHandler(error));
    }
  }
);
