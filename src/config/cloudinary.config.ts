import { v2 } from 'cloudinary';
import { settings } from '../constants/settings';
import fs from 'fs';

v2.config({
  api_key: settings.cloudinary.api_key,
  api_secret: settings.cloudinary.api_secret,
  cloud_name: settings.cloudinary.cloud_name,
});

export const uploadToCloud = async (path: string) => {
  const file = await v2.uploader.upload(path, {
    folder: 'realtor',
  });

  await fs.unlink(path, () => {
    console.log('File deleted');
  });

  return file?.url;
};
