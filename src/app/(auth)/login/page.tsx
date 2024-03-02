'use client';

import React, { useState } from 'react';
import { loginAPI } from '@/services/auth';

type LoginData = {
  username: String;
  password: String;
  login_type: String;
};

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('');

  const inputUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const inputPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const submitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data: LoginData = {
      username,
      password,
      login_type: userType,
    };

    loginAPI(data);
  };

  return (
    <form onSubmit={submitLogin}>
      <button type="button" onClick={() => setUserType('BUYER')}>
        구매회원 로그인
      </button>
      <button type="button" onClick={() => setUserType('SELLER')}>
        판매회원 로그인
      </button>

      {/* <input type="text" value={loginType} onChange={inputLoginType} /> */}
      <input type="text" value={username} onChange={inputUsername} />
      <input type="text" value={password} onChange={inputPassword} />

      <button type="submit">로그인</button>
    </form>
  );
}
