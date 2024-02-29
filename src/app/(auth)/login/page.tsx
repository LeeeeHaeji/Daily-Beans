'use client';

import React, { useState } from 'react';
import { loginAPI } from '../../../services/auth';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('');

  const loginData = {
    username,
    password,
    login_type: userType,
  };

  const inputUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    console.log(username);
  };

  const inputPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  // const inputLoginType = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setLoginType(e.target.value);
  // };

  const submitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    loginAPI(loginData);
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
