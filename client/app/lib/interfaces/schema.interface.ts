import { IUserSlice } from './store.interface';

export interface IAgent {
  username?: string;
  firstname: string;
  lastname: string;
  email?: string;
  imageUrl?: string;
  position: string;
  license: string;
  taxNumber: number;
  phone: number;
  companyName: string;
  address: string;
  description: string;
  socialMedia: {
    facebook: string;
    twitter: string;
    googlePlus: string;
    pinterest: string;
    website: string;
    instagram: string;
    youtube: string;
    linkedin: string;
  };
  userId?: string | IUserSlice;
  createdAt?: Date;
  updatedAt?: Date;
}
