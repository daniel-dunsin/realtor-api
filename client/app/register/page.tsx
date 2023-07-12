'use client';
import Link from 'next/link';
import React from 'react';
import AuthContainer from '../lib/components/AuthContainer/AuthContainer';
import { Button } from '../lib/components/ui/Button/Button';
import { Input } from '../lib/components/ui/InputElements/InputElements';
import Title from '../lib/components/ui/Title/Title';

const Register = () => {
  return (
    <AuthContainer bgText='Create your account'>
      <Title align='left' title='Create Account' />

      <div className='inputs-container'>
        <div className='input'>
          <label htmlFor='email'>Email</label>
          <Input
            minLength={6}
            type={'email'}
            placeholder={'Enter your email'}
            required={true}
            id='email'
          />
        </div>

        <div className='input'>
          <label htmlFor='username'>Username</label>
          <Input
            minLength={6}
            type={'text'}
            placeholder={'Enter your username'}
            required={true}
            id='username'
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

        <div className='input-checkbox'>
          <input type='checkbox' />
          <label htmlFor='agent'>Register as agent</label>
        </div>

        <Button bg='pink' text='Create Account' />

        <p className='alternative'>
          Already have an account? <Link href='/login'>Log in</Link>
        </p>
      </div>
    </AuthContainer>
  );
};

export default Register;
