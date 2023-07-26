'use client';
import { RootState } from '@/app/lib/redux/store';
import Image from 'next/image';
import React, { useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { BiPlus } from 'react-icons/bi';
import { useSelector } from 'react-redux';
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

      <div className='form-container'>
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
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
