'use client';
import { IUserSlice } from '../interfaces/store.interface';

export const setUserStorage = (user: IUserSlice) => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const setTokenStorage = (token: string) => {
  localStorage.setItem('token', token);
};

export const getUserStorage = (): IUserSlice => {
  return JSON.parse(localStorage.getItem('user') as string) as IUserSlice;
};

export const getTokenStorage = (): string | false =>
  typeof window !== 'undefined' && (localStorage.getItem('token') as string);
