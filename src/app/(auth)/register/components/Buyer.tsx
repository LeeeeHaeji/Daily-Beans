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

  const {
    idValidMsg,
    idSuccessMsg,
    pwdValidMsg,
    pwd2ValidMsg,
    nickNameValidMsg,
    initialPwdValid,
    initialPwd2Valid,
    phoneNumValidMsg,
    validIdClick,
    handleIdBlur,
    handlePwdBlur,
    handlePwd2Blur,
    handleNickNameBlur,
    submitLogin,
  } = ValidMsg(signUpData);

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [isChecked, setIsChecked] = useState(false);

  const confirmCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };

  useEffect(() => {
    if (idValidMsg || pwdValidMsg || pwd2ValidMsg || nickNameValidMsg || !isChecked) {
      setIsSubmitDisabled(true);
    } else {
      setIsSubmitDisabled(false);
    }
  }, [idValidMsg, pwdValidMsg, pwd2ValidMsg, nickNameValidMsg, isChecked]);

  return (
    <form onSubmit={(e) => submitLogin(e, signUpBuyer)}>
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
        <input type="checkbox" id="confirm" onChange={confirmCheckBox} />
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
