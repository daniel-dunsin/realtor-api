'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AuthContainer from '../lib/components/AuthContainer/AuthContainer';
import { Button } from '../lib/components/ui/Button/Button';
import { Input } from '../lib/components/ui/InputElements/InputElements';
import Title from '../lib/components/ui/Title/Title';
import { RootState } from '../lib/redux/store';
import { register } from '../lib/redux/thunks/authThunk';

const Register = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isAgent, setIsAgent] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const registerUser = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const data = await dispatch(
      register({ username, email, password, isAgent })
    );
    setIsLoading(false);

    if (!data?.error) {
      router.push('/');
    }
  };

  return (
    <AuthContainer bgText='Create your account'>
      <Title align='left' title='Create Account' />

      <form onSubmit={registerUser} className='inputs-container'>
        <div className='input'>
          <label htmlFor='email'>Email</label>
          <Input
            minLength={6}
            type={'email'}
            placeholder={'Enter your email'}
            required={true}
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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

        <div className='input-checkbox'>
          <input
            type='checkbox'
            checked={isAgent}
            id='agent'
            onChange={(e) => setIsAgent(e.target.checked)}
          />
          <label htmlFor='agent'>Register as agent</label>
        </div>

        <Button
          type='submit'
          bg='pink'
          text='Create Account'
          isLoading={isLoading}
        />

        <p className='alternative'>
          Already have an account? <Link href='/login'>Log in</Link>
        </p>
      </form>
    </AuthContainer>
  );
};

export default Register;
