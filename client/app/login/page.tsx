'use client';
import Link from 'next/link';
import React from 'react';
import AuthContainer from '../lib/components/AuthContainer/AuthContainer';
import { Button } from '../lib/components/ui/Button/Button';
import { Input } from '../lib/components/ui/InputElements/InputElements';
import Title from '../lib/components/ui/Title/Title';

const Login = () => {
  return (
    <AuthContainer bgText='Welcome back, log in to your account'>
      <Title align='left' title='Log in' />

      <div className='inputs-container'>
        <div className='input'>
          <label htmlFor='detail'>Email/Username</label>
          <Input
            minLength={6}
            type={'text'}
            placeholder={'Enter your email/username'}
            required={true}
            id='detail'
          />
        </div>

        <div className='input'>
          <label htmlFor='password'>Password</label>
          <Input
            minLength={8}
            type={'password'}
            placeholder={'Enter your password'}
            required={true}
            id='password'
          />
        </div>

        <Button bg='pink' text='Log in' />

        <p className='alternative'>
          Do not have an account?{' '}
          <Link href='/register'>Create An Account</Link>
        </p>
      </div>
    </AuthContainer>
  );
};

export default Login;
