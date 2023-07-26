import { http } from '@/axios.config';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { errorRes, loadingRes } from '../../utils/toast';
import { errorHandler } from '../../utils/errorHandler';

export const getProfile: any = createAsyncThunk(
  'agent/my-profile',
  async (_, thunkApi) => {
    try {
      const response = await http.get('/agent');

      return response?.data?.agent;
    } catch (error) {
      const errorFormatted = errorHandler(error);

      errorRes(errorFormatted);
      return thunkApi.rejectWithValue(errorFormatted);
    }
  }
);
