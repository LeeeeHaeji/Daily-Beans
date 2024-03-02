import React, { useState } from 'react';
import { signUpBuyer } from '@/services/auth';
import Default from './default';

import { SignUpData } from './types';

export default function Buyer() {
  const [signUpData, setSignUpData] = useState<SignUpData>({
    username: '',
    password: '',
    password2: '',
    userNickName: '',
    firstNum: '010',
    secondNum: '',
    thirdNum: '',
  });

  const submitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { username, password, password2, userNickName, firstNum, secondNum, thirdNum } =
      signUpData;

    const data = {
      username,
      password,
      password2,
      name: userNickName,
      phone_number: `${firstNum}${secondNum}${thirdNum}`,
    };

    signUpBuyer(data);
  };

  return (
    <form onSubmit={submitLogin}>
      <Default signUpData={signUpData} setSignUpData={setSignUpData} />
      <label htmlFor="confirm">
        <input type="checkbox" id="confirm" />
        데일리빈즈의 이용약관 및 개인정보처리방침에 대한 내용을 확인하였고 동의합니다.
      </label>
      <button type="submit">가입하기</button>
    </form>
  );
}
