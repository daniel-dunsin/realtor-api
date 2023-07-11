import { IAmenities } from '@/app/lib/interfaces/constants.types';
import {
  addAmenity,
  editSearch,
  removeAmenity,
} from '@/app/lib/redux/slices/searchSlice';
import { RootState } from '@/app/lib/redux/store';
import React, {
  ChangeEvent,
  ChangeEventHandler,
  useEffect,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Select } from '../../ui/InputElements/InputElements';
import { amenitiesList } from '@/app/lib/data';
import './Amenities.css';

const Amenities = () => {
  const { amenities, yearBuilt, bathrooms, bedrooms, area } = useSelector(
    (state: RootState) => state.search
  );
  const dispatch = useDispatch();

  const [years, setYears] = useState<string[]>([]);

  // To check if it has been selected
  const checkAmenity = (amenity: IAmenities) =>
    amenities.find((ame: IAmenities) => ame === amenity) ? true : false;

  const add = (amenity: IAmenities) => dispatch(addAmenity(amenity));

  const remove = (amenity: IAmenities) => dispatch(removeAmenity(amenity));

  const year = new Date().getFullYear();

  const edit = (key: string, value: string) =>
    dispatch(editSearch({ key, value }));

  const select = (e: ChangeEvent<HTMLSelectElement>) => {
    const selection = e.target.value;

    dispatch(edit(e.target.name, e.target.value));
  };

  useEffect(() => {
    const years: string[] = [];

    for (let i = year - 6; i <= year; i++) {
      years.push(i.toString());
    }

    setYears(years);
  }, []);

  return (
    <div className='amenities-container'>
      <header>
        <h3>Amenities</h3>
      </header>

      <div className='amenities-list'>
        {amenitiesList?.map((amenity, index: number) => {
          const isChecked = checkAmenity(amenity);
          return (
            <div className='input-container' key={index}>
              <input
                type='checkbox'
                id={amenity}
                checked={isChecked}
                value={amenity}
                onChange={(e) =>
                  e.target.checked ? add(amenity) : remove(amenity)
                }
              />
              <label htmlFor={amenity}>{amenity}</label>
            </div>
          );
        })}
      </div>

      <div className='extra-filters'>
        <Select
          options={['1', '2', '3', '4', '5', '6', '7', '8']}
          selected={bathrooms.toString()}
          default={'Bathrooms'}
          value={bathrooms || 'Bathrooms'}
          name='bathrooms'
          onChange={select}
        />

        <Select
          options={['1', '2', '3', '4', '5', '6', '7', '8']}
          selected={bedrooms.toString() || ''}
          default={'Bedrooms'}
          value={bedrooms || 'Bedrooms'}
          name='bedrooms'
          onChange={select}
        />

        <Select
          options={years}
          selected={yearBuilt.toString() || ''}
          default={'Year Built'}
          value={yearBuilt || 'Year Built'}
          name='yearBuilt'
          onChange={select}
        />

        <Input
          type={'number'}
          value={area || ''}
          placeholder='Area'
          min={1}
          onChange={(e) => edit('area', e.target.value)}
        />
      </div>
    </div>
  );
};

export default Amenities;
