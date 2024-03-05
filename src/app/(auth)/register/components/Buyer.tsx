import React, { useState } from 'react';
import { signUpBuyer } from '@/services/auth';
import Default from './default';

import { SignUpData } from './types';
import '@/styles/auth/register/register.scss';

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

    await signUpBuyer(data);
  };

  return (
    <form onSubmit={submitLogin}>
      <div className="form-data">
        <Default signUpData={signUpData} setSignUpData={setSignUpData} />
      </div>
      <label htmlFor="confirm" className="confirm">
        <input type="checkbox" id="confirm" />
        <span className="on"> </span>
        데일리빈즈의 <strong>이용약관</strong> 및 <strong>개인정보처리방침</strong>에 대한 내용을
        확인하였고 동의합니다.
      </label>
      <button type="submit" className="submit-button">
        가입하기
      </button>
    </form>
  );
}
