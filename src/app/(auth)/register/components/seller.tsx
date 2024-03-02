import React, { useState } from 'react';
import { signUpSeller } from '@/services/auth';
import { SignUpData } from './types';
import Default from './default';

export default function Seller() {
  const [signUpData, setSignUpData] = useState<SignUpData>({
    username: '',
    password: '',
    password2: '',
    userNickName: '',
    firstNum: '010',
    secondNum: '',
    thirdNum: '',
  });

  const [companyRegNum, setCompanyRegNum] = useState('');
  const [storeName, setStoreName] = useState('');

  const inputCompanyRegNum = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyRegNum(e.target.value);
  };

  const inputStoreName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStoreName(e.target.value);
  };

  const submitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { username, password, password2, userNickName, firstNum, secondNum, thirdNum } =
      signUpData;

    const data = {
      username,
      password,
      password2,
      phone_number: `${firstNum}${secondNum}${thirdNum}`,
      name: userNickName,
      company_registration_number: companyRegNum,
      store_name: storeName,
    };

    signUpSeller(data);
  };

  return (
    <form onSubmit={submitLogin}>
      <Default signUpData={signUpData} setSignUpData={setSignUpData} />

      <p>사업자 등록번호</p>
      <input type="number" value={companyRegNum} onChange={inputCompanyRegNum} />

      <p>스토어 이름</p>
      <input type="text" value={storeName} onChange={inputStoreName} />

      <label htmlFor="confirm">
        <input type="checkbox" id="confirm" />
        데일리빈즈의 <strong>이용약관</strong> 및 <strong>개인정보처리방침</strong>에 대한 내용을
        확인하였고 동의합니다.
      </label>

      <button type="submit"> 가입하기 </button>
    </form>
  );
}
