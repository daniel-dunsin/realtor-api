import { IAmenities } from '@/app/interfaces/constants.types';
import { ISearchSlice } from '@/app/interfaces/store.interface';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: ISearchSlice = {
  offer: 'Sale',
  keyword: '',
  propertyType: '',
  location: '',
  price: 0,
  amenities: [],
  bathrooms: 0,
  bedrooms: 0,
  yearBuilt: 0,
  area: 0,
};

const searchSlice = createSlice({
  name: 'searchSlice',
  initialState,
  reducers: {
    editSearch: (
      state: ISearchSlice,
      action: PayloadAction<{ key: string; value: string | number }>
    ) => {
      state[action.payload.key as keyof ISearchSlice] = action.payload
        .value as never;
    },
    addAmenity: (state: ISearchSlice, action: PayloadAction<IAmenities>) => {
      // Check if that amenity has already been selected
      state.amenities = [...state.amenities, action.payload];
    },

    removeAmenity: (state: ISearchSlice, action: PayloadAction<IAmenities>) => {
      state.amenities = state.amenities.filter(
        (amenity) => amenity !== action.payload
      );
    },
  },
});

export const searchReducer = searchSlice.reducer;
export const { editSearch, addAmenity, removeAmenity } = searchSlice.actions;
