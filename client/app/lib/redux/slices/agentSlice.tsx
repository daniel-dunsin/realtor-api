import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAgent } from '../../interfaces/schema.interface';
import { IAgentSlice } from '../../interfaces/store.interface';
import { getProfile } from '../thunks/agentThunk';

const initialState: IAgentSlice = {
  firstname: '',
  lastname: '',
  taxNumber: 0,
  username: '',
  email: '',
  position: '',
  license: '',
  phone: 0,
  companyName: '',
  address: '',
  description: '',
  socialMedia: {
    facebook: '',
    twitter: '',
    googlePlus: '',
    pinterest: '',
    website: '',
    instagram: '',
    youtube: '',
    linkedin: '',
  },
};

const agentSlice = createSlice({
  name: 'agentSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getProfile.fulfilled,
      (state: IAgentSlice, action: PayloadAction<IAgent>) => {
        return { ...state, ...action.payload };
      }
    );
  },
});

export const agentReducer = agentSlice.reducer;

export const {} = agentSlice.actions;
