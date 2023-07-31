'use client';
import { Button } from '@/app/lib/components/ui/Button/Button';
import {
  Input,
  Textarea,
} from '@/app/lib/components/ui/InputElements/InputElements';
import { RootState } from '@/app/lib/redux/store';
import Image from 'next/image';
import React, { ChangeEvent, useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { BiPlus } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import DashboardLayout from '../components/DashboardLayout/DashboardLayout';
import Title from '../components/Title/Title';

import '../create-listing/page.css';
import './page.css';

const Profile = () => {
  const agent = useSelector((state: RootState) => state.agent);
  const [file, setFile] = useState<null | File>(null);

  const handleUpload = (file: File[]) => {
    setFile(file[0]);
  };

  return (
    <DashboardLayout>
      <Title title='Update Profile' />

      <form className='form-container'>
        <div className='inputs-container'>
          <div>
            <label htmlFor=''>Profile picture</label>
            <FileUploader
              handleChange={handleUpload}
              multiple={true}
              name={'image'}
              types={['PNG', 'JPEG', 'JPG', 'WEBP']}
            >
              <div className='picture-container'>
                <Image
                  className='profile-pics'
                  width={200}
                  height={200}
                  src={
                    file
                      ? URL.createObjectURL(file)
                      : agent?.imageUrl
                      ? agent?.imageUrl
                      : '/images/Non-profile.jpg'
                  }
                  alt=''
                />
                <span>
                  <BiPlus />
                </span>
              </div>
            </FileUploader>
          </div>

          <div
            className='field-flex'
            style={{ gridTemplateColumns: `repeat(2, 1fr)` }}
          >
            <div>
              <label htmlFor='firstname'>Firstname</label>
              <Input
                type='text'
                id='firstname'
                placeholder='Enter firstname'
                name='firstname'
              />
            </div>

            <div>
              <label htmlFor='lastname'>Lastname</label>
              <Input
                type='text'
                id='lastname'
                placeholder='Enter lastname'
                name='lastname'
              />
            </div>

            <div>
              <label htmlFor='taxNumber'>Tax Number</label>
              <Input
                type='text'
                id='taxNumber'
                placeholder='Enter tax numberr'
                name='taxNumber'
              />
            </div>

            <div>
              <label htmlFor='position'>Position</label>
              <Input
                type='text'
                id='position'
                placeholder='Enter position e.g Bank Manager'
                name='position'
              />
            </div>

            <div>
              <label htmlFor='license'>License</label>
              <Input
                type='text'
                id='license'
                placeholder='Enter license e.g ISC'
                name='license'
              />
            </div>

            <div>
              <label htmlFor='phone'>Phone Number</label>
              <Input
                type='number'
                id='phone'
                placeholder='Enter phone number'
                name='phone'
                minLength={10}
              />
            </div>

            <div>
              <label htmlFor='companyName'>Company Name</label>
              <Input
                type='text'
                id='companyName'
                placeholder='Enter company name'
                name='companyName'
              />
            </div>

            <div>
              <label htmlFor='address'>Address</label>
              <Input
                type='text'
                id='address'
                placeholder='Enter address'
                name='address'
              />
            </div>
          </div>

          <div>
            <label htmlFor='description'>Description</label>
            <Textarea
              type='text'
              id='description'
              placeholder='Enter description'
              name='description'
            />
          </div>

          <div>
            <label htmlFor=''>Social Media</label>

            <div
              className='field-flex'
              style={{ gridTemplateColumns: `repeat(3, 1fr)` }}
            >
              <Input type={'text'} placeholder='Facebook' name='facebook' />
              <Input type={'text'} placeholder='Twitter' name='twitter' />
              <Input
                type={'text'}
                placeholder='Google Plus'
                name='googlePlus'
              />
              <Input type={'text'} placeholder='Pinterest' name='pinterest' />
              <Input type={'text'} placeholder='Website' name='website' />
              <Input type={'text'} placeholder='Instagram' name='instagram' />
              <Input type={'text'} placeholder='Youtube' name='youtube' />
              <Input type={'text'} placeholder='Linkedin' name='linkedin' />
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: '1rem',
            maxWidth: 'fit-content',
            marginLeft: 'auto',
          }}
        >
          <Button bg='pink' text='Submit' type='submit' />
        </div>
      </form>
    </DashboardLayout>
  );
};

export default Profile;
