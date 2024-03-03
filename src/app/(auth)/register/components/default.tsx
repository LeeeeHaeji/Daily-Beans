import React from 'react';
import { SignUpData } from './types';
import '@/styles/auth/register/default.scss';

export default function Default({
  signUpData,
  setSignUpData,
}: {
  signUpData: SignUpData;
  setSignUpData: React.Dispatch<React.SetStateAction<SignUpData>>;
}) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSignUpData((prevState: SignUpData) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <section className="data-wrap">
      <div className="input-wrap">
        <p>아이디</p>
        <div className="double-check">
          <input type="text" name="username" value={signUpData.username} onChange={handleChange} />
          <button type="button">중복확인</button>
        </div>
      </div>

      <div className="input-wrap">
        <p>비밀번호</p>
        <input
          type="password"
          name="password"
          value={signUpData.password}
          onChange={handleChange}
        />
      </div>

      <div className="input-wrap">
        <p>비밀번호 재확인</p>
        <input
          type="password2"
          name="password2"
          value={signUpData.password2}
          onChange={handleChange}
        />
      </div>

      <div className="input-wrap">
        <p>이름</p>
        <input
          type="text"
          name="userNickName"
          value={signUpData.userNickName}
          onChange={handleChange}
        />
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
            onChange={handleChange}
          />
          <input
            type="number"
            name="thirdNum"
            value={signUpData.thirdNum}
            onChange={handleChange}
          />
        </div>
      </div>
    </section>
  );
}
