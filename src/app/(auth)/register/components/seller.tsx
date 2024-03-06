import React, { useState, useEffect } from 'react';
import { signUpSeller } from '@/services/auth';
import { SignUpData } from './types';
import Default from './default';
import ValidMsg from './validMsg';

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

  const {
    idValidMsg,
    idSuccessMsg,
    pwdValidMsg,
    pwd2ValidMsg,
    nickNameValidMsg,
    initialPwdValid,
    initialPwd2Valid,
    phoneNumValidMsg,
    companyValidMsg,
    companySuccessMsg,
    storeValidMsg,
    validIdClick,
    handleIdBlur,
    handlePwdBlur,
    handlePwd2Blur,
    handleNickNameBlur,
    handleCompanyBlur,
    handleStoreBlur,
    sellerLoginData,
    submitLogin,
  } = ValidMsg(signUpData);

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [isChecked, setIsChecked] = useState(false);

  const [companyRegNum, setCompanyRegNum] = useState('');
  const [storeName, setStoreName] = useState('');

  const inputCompanyRegNum = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyRegNum(e.target.value);
  };

  const inputStoreName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStoreName(e.target.value);
  };

  const confirmCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };

  useEffect(() => {
    if (
      idValidMsg ||
      pwdValidMsg ||
      pwd2ValidMsg ||
      nickNameValidMsg ||
      companyValidMsg ||
      storeValidMsg ||
      !isChecked
    ) {
      setIsSubmitDisabled(true);
    } else {
      setIsSubmitDisabled(false);
    }
  }, [
    idValidMsg,
    pwdValidMsg,
    pwd2ValidMsg,
    nickNameValidMsg,
    isChecked,
    companyValidMsg,
    storeValidMsg,
  ]);

  return (
    <form
      onSubmit={(e) =>
        submitLogin(
          e,
          signUpSeller,
          { company_registration_number: companyRegNum, store_name: storeName },
          sellerLoginData,
        )
      }
    >
      <div className="form-data seller">
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

        <div className="data-wrap">
          <div className="input-wrap ">
            <p>사업자 등록번호</p>
            <input
              type="number"
              value={companyRegNum}
              onChange={inputCompanyRegNum}
              onBlur={() => handleCompanyBlur(companyRegNum, storeName)}
            />
            {companyValidMsg ? <p className="errorMsg">*{companyValidMsg}</p> : ''}
            {companySuccessMsg ? <p className="SuccessMsg">*{companySuccessMsg}</p> : ''}
          </div>
          <div className="input-wrap ">
            <p>스토어 이름</p>
            <input
              type="text"
              value={storeName}
              onChange={inputStoreName}
              onBlur={() => handleStoreBlur(storeName)}
            />
            {storeValidMsg ? <p className="errorMsg">*{storeValidMsg}</p> : ''}
          </div>
        </div>
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
