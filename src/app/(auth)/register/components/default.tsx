import React from 'react';
import Image from 'next/image';

import { SignUpData } from './types';
import '@/styles/auth/register/default.scss';
import '@/styles/auth/common.scss';

export default function Default({
  signUpData,
  setSignUpData,
  phoneNumValidMsg,
  idValidMsg,
  idSuccessMsg,
  pwdValidMsg,
  pwd2ValidMsg,
  nickNameValidMsg,
  initialPwdValid,
  initialPwd2Valid,
  validIdClick,
  handleIdBlur,
  handlePwdBlur,
  handlePwd2Blur,
  handleNickNameBlur,
}: {
  signUpData: SignUpData;
  setSignUpData: React.Dispatch<React.SetStateAction<SignUpData>>;
  phoneNumValidMsg: string;
  idValidMsg: string;
  idSuccessMsg: string;
  pwdValidMsg: string;
  pwd2ValidMsg: string;
  nickNameValidMsg: string;
  initialPwdValid: boolean;
  initialPwd2Valid: boolean;
  validIdClick: () => void;
  handleIdBlur: () => void;
  handlePwdBlur: () => void;
  handlePwd2Blur: () => void;
  handleNickNameBlur: () => void;
}) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSignUpData((prevState: SignUpData) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSecondNum = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (/^\d{0,4}$/.test(value)) {
      setSignUpData((prevState: SignUpData) => ({
        ...prevState,
        secondNum: value,
      }));
    }
  };

  const handleThirdNum = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (/^\d{0,4}$/.test(value)) {
      setSignUpData((prevState: SignUpData) => ({
        ...prevState,
        thirdNum: value,
      }));
    }
  };

  return (
    <section className="data-wrap">
      <div className="input-wrap">
        <p>아이디</p>
        <div className="double-check">
          <input
            type="text"
            name="username"
            value={signUpData.username}
            onChange={handleChange}
            onBlur={handleIdBlur}
          />
          <button type="button" onClick={validIdClick}>
            중복확인
          </button>
        </div>
        {idValidMsg ? <p className="errorMsg">*{idValidMsg}</p> : ''}
        {idSuccessMsg ? <p className="SuccessMsg">*{idSuccessMsg}</p> : ''}
      </div>

      <div className="input-wrap pwd">
        <p>비밀번호</p>
        <input
          type="password"
          name="password"
          value={signUpData.password}
          onChange={handleChange}
          onBlur={handlePwdBlur}
        />
        <Image
          src={!initialPwdValid ? '/img/icon-check-off.png' : '/img/icon-check-on.png'}
          alt="비밀번호 유효성 검사"
          width={28}
          height={28}
          className="validCheck"
        />
        {pwdValidMsg ? <p className="errorMsg">*{pwdValidMsg}</p> : ''}
      </div>

      <div className="input-wrap pwd">
        <p>비밀번호 재확인</p>
        <input
          type="password"
          name="password2"
          value={signUpData.password2}
          onChange={handleChange}
          onBlur={handlePwd2Blur}
          className="pwd"
        />
        <Image
          src={!initialPwd2Valid ? '/img/icon-check-off.png' : '/img/icon-check-on.png'}
          alt="비밀번호 유효성 검사"
          width={28}
          height={28}
          className="validCheck"
        />
        {pwd2ValidMsg ? <p className="errorMsg">*{pwd2ValidMsg}</p> : ''}
      </div>

      <div className="input-wrap">
        <p>이름</p>
        <input
          type="text"
          name="userNickName"
          value={signUpData.userNickName}
          onChange={handleChange}
          onBlur={handleNickNameBlur}
        />
        {nickNameValidMsg ? <p className="errorMsg">*{nickNameValidMsg}</p> : ''}
      </div>

      <div className="phone-number">
        <p>휴대폰번호</p>
        <div className="number-data">
          <select name="firstNum" onChange={handleChange}>
            <option value="010">010</option>
            <option value="011">011</option>
            <option value="016">016</option>
            <option value="017">017</option>
            <option value="018">018</option>
            <option value="019">019</option>
          </select>

          <input
            type="number"
            name="secondNum"
            value={signUpData.secondNum}
            onChange={handleSecondNum}
          />
          <input
            type="number"
            name="thirdNum"
            value={signUpData.thirdNum}
            onChange={handleThirdNum}
          />
        </div>
        {phoneNumValidMsg ? <p className="errorMsg">*{phoneNumValidMsg}</p> : ''}
      </div>
    </section>
  );
}
