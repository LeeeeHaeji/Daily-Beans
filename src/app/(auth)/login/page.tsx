'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { loginAPI } from '@/services/auth';
import { LoginData } from './types';
import '@/styles/auth/login/login.scss';
import '@/styles/auth/login/toggle.scss';
import '@/styles/button.scss';
import '@/styles/auth/common.scss';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('BUYER');
  const [isTest, setIsTest] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isTest && userType === 'BUYER') {
      setUsername('buyer1');
      setPassword('hodu0910');
    } else if (isTest && userType === 'SELLER') {
      setUsername('seller1');
      setPassword('hodu0910');
    } else {
      setUsername('');
      setPassword('');
    }
  }, [isTest, userType]);

  const inputUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const inputPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const testLoginCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsTest(e.target.checked);
  };

  const submitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data: LoginData = {
      username,
      password,
      login_type: userType,
    };

    try {
      await loginAPI(data);
      router.back();
    } catch (error) {
      console.error(error); // 로그인 실패 처리
    }
  };

  return (
    <section className="container">
      <h1 className="a11y-hidden">Daily Beans</h1>
      <Link href="/" className="logo">
        <Image src="svg/Daily-Beans.svg" alt="logo" width={428} height={74} />
      </Link>
      <form onSubmit={submitLogin}>
        <div className="typeTap">
          <button
            type="button"
            className={userType === 'BUYER' ? 'buyer' : 'none'}
            onClick={() => setUserType('BUYER')}
          >
            구매회원 로그인
          </button>
          <button
            type="button"
            className={userType === 'SELLER' ? 'seller' : 'none'}
            onClick={() => setUserType('SELLER')}
          >
            판매회원 로그인
          </button>
        </div>

        <div className="login">
          <div className="input-data">
            <input type="text" value={username} onChange={inputUsername} placeholder="아이디" />
            <input
              type="password"
              value={password}
              onChange={inputPassword}
              placeholder="비밀번호"
            />
          </div>

          <div className="test-login">
            {/* 토글버튼 */}
            <div className="button r" id="button-3">
              <input
                type="checkbox"
                className="checkbox"
                onChange={testLoginCheckBox}
                checked={isTest}
              />
              <div className="knobs"> </div>
              <div className="layer"> </div>
            </div>
            <p>테스트 계정으로 로그인</p>
          </div>
          <button type="submit" className="submit-button">
            로그인
          </button>
        </div>

        <div className="link">
          <Link href="/register">회원가입</Link>
          <span>|</span>
          <Link href="/">비밀번호 찾기</Link>
        </div>
      </form>
    </section>
  );
}
