'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import AuthContainer from '../lib/components/AuthContainer/AuthContainer';
import { Button } from '../lib/components/ui/Button/Button';
import { Input } from '../lib/components/ui/InputElements/InputElements';
import Title from '../lib/components/ui/Title/Title';
import { login } from '../lib/redux/thunks/authThunk';

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [credential, setCredential] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isloading, setisloading] = useState<boolean>(false);

  const loginUser = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    setisloading(true);

    const data = await dispatch(login({ credential, password }));

    setisloading(false);

    if (!data?.error) {
      router.push('/');
    }
  };

  return (
    <AuthContainer bgText='Welcome back, log in to your account'>
      <Title align='left' title='Log in' />

      <form onSubmit={loginUser} className='inputs-container'>
        <div className='input'>
          <label htmlFor='detail'>Email/Username</label>
          <Input
            minLength={6}
            type={'text'}
            placeholder={'Enter your email/username'}
            required={true}
            id='detail'
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <Button type='submit' isloading={isloading} bg='pink' text='Log in' />

        <p className='alternative'>
          Do not have an account?{' '}
          <Link href='/register'>Create An Account</Link>
        </p>
      </form>
    </AuthContainer>
  );
};

export default Login;
