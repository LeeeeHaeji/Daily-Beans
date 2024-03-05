import React, { useState, useEffect } from 'react';
import { signUpBuyer } from '@/services/auth';
import Default from './default';
import ValidMsg from './validMsg';

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

  const [phoneNumValidMsg, setPhoneNumValidMsg] = useState('');
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const {
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
  } = ValidMsg(signUpData);

  useEffect(() => {
    if (idValidMsg || pwdValidMsg || pwd2ValidMsg || nickNameValidMsg) {
      setIsSubmitDisabled(true);
    } else {
      setIsSubmitDisabled(false);
    }
  }, [idValidMsg, pwdValidMsg, pwd2ValidMsg, nickNameValidMsg]);

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

    const response = await signUpBuyer(data);
    let tempphoneNumErrorMsg = '';

    if (response?.[0].phone_number) {
      tempphoneNumErrorMsg = response?.[0].phone_number;
    }

    setPhoneNumValidMsg(tempphoneNumErrorMsg);
  };

  return (
    <form onSubmit={submitLogin}>
      <div className="form-data">
        <Default
          signUpData={signUpData}
          setSignUpData={setSignUpData}
          phoneNumValidMsg={phoneNumValidMsg}
          idValidMsg={idValidMsg}
          idSuccessMsg={idSuccessMsg}
          pwdValidMsg={pwdValidMsg}
          pwd2ValidMsg={pwd2ValidMsg}
          nickNameValidMsg={nickNameValidMsg}
          initialPwdValid={initialPwdValid}
          initialPwd2Valid={initialPwd2Valid}
          validIdClick={validIdClick}
          handleIdBlur={handleIdBlur}
          handlePwdBlur={handlePwdBlur}
          handlePwd2Blur={handlePwd2Blur}
          handleNickNameBlur={handleNickNameBlur}
        />
      </div>
      <label htmlFor="confirm" className="confirm">
        <input type="checkbox" id="confirm" />
        <span className="on"> </span>
        데일리빈즈의 <strong>이용약관</strong> 및 <strong>개인정보처리방침</strong>에 대한 내용을
        확인하였고 동의합니다.
      </label>
      <button type="submit" className="submit-button" disabled={isSubmitDisabled}>
        가입하기
      </button>
    </form>
  );
}
