'use client';

import React, { useState } from 'react';
import { signUpBuyer } from '@/services/auth';

type SignUpData = {
  username: String; // 아이디
  password: String;
  password2: String;
  phone_number: String; // 전화번호는 010으로 시작하는 10~11자리 숫자
  name: String; // 이름
};

export default function Buyer() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [userNickName, setUserNickName] = useState('');

  const [firstNum, setFirstNum] = useState('010');
  const [secondNum, setSecondNum] = useState('');
  const [thirdNum, setThirdNum] = useState('');

  const inputUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const inputPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const inputPassword2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword2(e.target.value);
  };

  const inputUserNickName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserNickName(e.target.value);
  };

  const seletFirstNum = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFirstNum(e.target.value);
  };

  const inputSecondNum = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSecondNum(e.target.value);
  };

  const inputThirdNum = (e: React.ChangeEvent<HTMLInputElement>) => {
    setThirdNum(e.target.value);
  };

  const submitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const phoneNum = firstNum + secondNum + thirdNum;

    const data: SignUpData = {
      username,
      password,
      password2,
      phone_number: phoneNum,
      name: userNickName,
    };

    signUpBuyer(data);
  };

  return (
    <form onSubmit={submitLogin}>
      <p>아이디</p>
      <input type="text" value={username} onChange={inputUsername} />
      <button type="button"> 중복확인 </button>

      <p>비밀번호</p>
      <input type="password" value={password} onChange={inputPassword} />
      <p>비밀번호 재확인</p>
      <input type="password" value={password2} onChange={inputPassword2} />

      <p>이름</p>
      <input type="text" value={userNickName} onChange={inputUserNickName} />

      <p>휴대폰번호</p>
      <select onChange={seletFirstNum}>
        <option value="010">010</option>
        <option value="011">011</option>
        <option value="016">016</option>
        <option value="017">017</option>
        <option value="018">018</option>
        <option value="019">019</option>
      </select>

      <input type="number" value={secondNum} onChange={inputSecondNum} />
      <input type="number" value={thirdNum} onChange={inputThirdNum} />

      <label htmlFor="confirm">
        <input type="checkbox" id="confirm" />
        데일리빈즈의 이용약관 및 개인정보처리방침에 대한 내용을 확인하였고 동의합니다.
      </label>

      <button type="submit"> 가입하기 </button>
    </form>
  );
}
