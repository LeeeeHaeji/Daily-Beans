'use client';

import React, { useState, useEffect, useRef } from 'react';
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
  const [id, setID] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('BUYER');
  const [isTest, setIsTest] = useState(false);

  const [idErrorMsg, setIdErrorMsg] = useState('');
  const [pwdErrorMsg, setPwdErrorMsg] = useState('');
  const [failMsg, setFailMsg] = useState('');
  const router = useRouter();

  const idInputRef = useRef<HTMLInputElement>(null);
  const pwdInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isTest && userType === 'BUYER') {
      setID('buyer1');
      setPassword('hodu0910');
    } else if (isTest && userType === 'SELLER') {
      setID('seller1');
      setPassword('hodu0910');
    } else {
      setID('');
      setPassword('');
    }
  }, [isTest, userType]);

  useEffect(() => {
    // 비밀번호 상태가 초기화된 후 실행
    if (failMsg && !password) {
      pwdInputRef.current?.focus();
    }
  }, [failMsg, password]);

  useEffect(() => {
    if (idErrorMsg && pwdErrorMsg) {
      idInputRef.current?.focus();
    } else if (idErrorMsg) {
      idInputRef.current?.focus();
    } else {
      pwdInputRef.current?.focus();
    }
  }, [idErrorMsg, pwdErrorMsg]);

  const inputID = (e: React.ChangeEvent<HTMLInputElement>) => {
    setID(e.target.value);
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
      username: id,
      password,
      login_type: userType,
    };

    try {
      const response = await loginAPI(data);
      console.log(response);
      let tempIdErrorMsg = '';
      let tempPwdErrorMsg = '';
      let tempFailMsg = '';

      if (response?.[0].username) {
        tempIdErrorMsg = response?.[0].username;
      }

      if (response?.[0].password) {
        tempPwdErrorMsg = response?.[0].password;
      }

      if (response?.[0].FAIL_Message) {
        tempFailMsg = response?.[0].FAIL_Message;
      }

      setIdErrorMsg(tempIdErrorMsg);
      setPwdErrorMsg(tempPwdErrorMsg);
      setFailMsg(tempFailMsg);

      if (!tempIdErrorMsg && !tempPwdErrorMsg && !tempFailMsg) {
        router.back();
      } else if (tempFailMsg) {
        setPassword('');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="container">
      <h1 className="a11y-hidden">Daily Beans</h1>
      <Link href="/" className="logo">
        <Image src="svg/Daily-Beans.svg" alt="logo" width={428} height={74} priority />
      </Link>
      <form onSubmit={submitLogin} className="form">
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
            <input
              type="text"
              value={id}
              ref={idInputRef}
              onChange={inputID}
              placeholder="아이디"
            />
            {idErrorMsg ? <p className="errorMsg">*이 필드는 필수 항목입니다.</p> : ''}
            <input
              type="password"
              value={password}
              ref={pwdInputRef}
              onChange={inputPassword}
              placeholder="비밀번호"
            />
            {pwdErrorMsg ? <p className="errorMsg">*이 필드는 필수 항목입니다.</p> : ''}
            {failMsg ? <p className="errorMsg">*{failMsg}</p> : ''}
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
