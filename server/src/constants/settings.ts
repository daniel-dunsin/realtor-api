import { config } from 'dotenv';
import { collections } from './collections';

config();

export const settings = {
  port: process.env.PORT,

  mongo: {
    url: process.env.DB_URL,
    collections: {
      user: collections.user,
      auth: collections.auth,
      agent: collections.agent,
    },
  },

  jwt: {
    secret: process.env.SECRET,
  },

  cloudinary: {
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
  },
};
