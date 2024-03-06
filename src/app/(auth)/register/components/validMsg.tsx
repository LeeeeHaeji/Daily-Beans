import { useState } from 'react';
import { validCompany, validIdAPI } from '@/services/auth';

import { SignUpData } from './types';

const ValidMsg = (signUpData: SignUpData) => {
  const [idValidMsg, setIdValidMsg] = useState('');
  const [idSuccessMsg, setIdSuccessMsg] = useState('');
  const [pwdValidMsg, setPwdValidMsg] = useState('');
  const [pwd2ValidMsg, setPwd2ValidMsg] = useState('');
  const [nickNameValidMsg, setNickNameValidMsg] = useState('');
  const [initialPwdValid, setInitialPwdValid] = useState<boolean>(false);
  const [initialPwd2Valid, setInitialPwd2Valid] = useState<boolean>(false);
  const [phoneNumValidMsg, setPhoneNumValidMsg] = useState('');

  const [companyValidMsg, setCompanyValidMsg] = useState('');
  const [companySuccessMsg, setCompanySuccessMsg] = useState('');

  const [storeValidMsg, setStoreValidMsg] = useState('');

  const [isValidCheck, setIsValidCheck] = useState(false);

  const validIdPwd = async ({ username, password }: SignUpData) => {
    const patternID = /^[a-zA-Z0-9]{1,20}$/;
    const patternPwd =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+\\|[\]{};:'",.<>/?]).{8,}$/;

    const validID = patternID.test(username);
    const validPwd = patternPwd.test(password);

    return [validID, validPwd];
  };

  const validIdClick = async () => {
    const response = await validIdAPI(signUpData);
    const [validID] = await validIdPwd(signUpData);

    let tempIdValidMsg = '';
    let tempIdSuccessMsg = '';

    if (response?.[0].FAIL_Message === 'username 필드를 추가해주세요 :)' && !validID) {
      tempIdValidMsg = '필수 정보입니다';
    } else if (!validID) {
      tempIdValidMsg = '20자 이내의 영문 소문자, 대문자, 숫자만 사용 가능합니다.';
    } else {
      tempIdValidMsg = response?.[0].FAIL_Message;
    }

    if (response?.[0].Success && !validID) {
      tempIdSuccessMsg = '';
    } else if (response?.[0].Success) {
      tempIdSuccessMsg = '사용 가능한 아이디입니다.';
    }

    setIdSuccessMsg(tempIdSuccessMsg);
    setIdValidMsg(tempIdValidMsg);

    if (tempIdSuccessMsg) {
      setIsValidCheck(true);
    }
  };

  const handleIdBlur = () => {
    if (!signUpData.username) {
      setIdValidMsg('필수 정보입니다.');
      setIdSuccessMsg('');
    }
  };

  const handlePwdBlur = async () => {
    const [, validPwd] = await validIdPwd(signUpData);

    // 비밀번호 유효성 검사
    if (!signUpData.password) {
      setPwdValidMsg('필수 정보입니다.');
      setInitialPwdValid(false);
    } else if (!validPwd) {
      setPwdValidMsg('8자 이상, 영문 대 소문자, 숫자, 특수문자를 사용하세요.');
      setInitialPwdValid(false);
    } else {
      setPwdValidMsg('');
      setInitialPwdValid(true);
    }
  };

  const handlePwd2Blur = () => {
    const validPwd2 = signUpData.password === signUpData.password2;
    if (!signUpData.password2) {
      setPwd2ValidMsg('필수 정보입니다.');
      setInitialPwd2Valid(false);
    } else if (pwdValidMsg) {
      setPwd2ValidMsg('비밀번호를 다시 작성해주세요.');
      setInitialPwd2Valid(false);
    } else if (!validPwd2) {
      setPwd2ValidMsg('비밀번호가 일치하지 않습니다.');
      setInitialPwd2Valid(false);
    } else {
      setPwd2ValidMsg('');
      setInitialPwd2Valid(true);
    }
  };

  const handleNickNameBlur = () => {
    if (!signUpData.userNickName) {
      setNickNameValidMsg('필수 정보입니다.');
    } else {
      setNickNameValidMsg('');
    }
  };

  const handleCompanyBlur = async (companyRegNum: string, storeName: string) => {
    const { username, password, password2, userNickName, firstNum, secondNum, thirdNum } =
      signUpData;

    let data = {
      username,
      password,
      password2,
      name: userNickName,
      phone_number: `${firstNum}${secondNum}${thirdNum}`,
    };

    const additionalData = {
      company_registration_number: companyRegNum,
      store_name: storeName,
    };

    data = { ...data, ...additionalData };

    const response = await validCompany(data);

    let tempCompanyValidMsg = '';
    let tempCompanySuccessMsg = '';

    if (response?.[0].FAIL_Message === 'company_registration_number 필드를 추가해주세요 :)') {
      tempCompanyValidMsg = '필수 정보입니다';
    } else {
      tempCompanyValidMsg = response?.[0].FAIL_Message;
    }

    if (response?.[0].Success) {
      tempCompanySuccessMsg = response?.[0].Success;
    } else {
      tempCompanySuccessMsg = '';
    }

    setCompanySuccessMsg(tempCompanySuccessMsg);
    setCompanyValidMsg(tempCompanyValidMsg);
  };

  const handleStoreBlur = (storeName: string) => {
    if (!storeName) {
      setStoreValidMsg('필수 정보입니다.');
    } else {
      setStoreValidMsg('');
    }
  };

  const sellerLoginData = (response: any) => {
    let tempStoreValidMsg = '';
    let tempCompanyValidMsg = '';

    if (response?.[0].store_name) {
      tempStoreValidMsg = '필수 정보입니다.';
    } else {
      tempStoreValidMsg = '';
    }

    if (response?.[0].company_registration_number) {
      tempCompanyValidMsg = '필수 정보입니다.';
    } else {
      tempCompanyValidMsg = '';
    }

    setStoreValidMsg(tempStoreValidMsg);
    setCompanyValidMsg(tempCompanyValidMsg);
  };

  const submitLogin = async (
    e: React.FormEvent<HTMLFormElement>,
    apiFunction: (data: object) => Promise<any[] | null>,
    additionalData: { [key: string]: any } = {},
    additionalProcessing?: (response: any) => void,
  ) => {
    e.preventDefault();

    const { username, password, password2, userNickName, firstNum, secondNum, thirdNum } =
      signUpData;

    let data = {
      username,
      password,
      password2,
      name: userNickName,
      phone_number: `${firstNum}${secondNum}${thirdNum}`,
    };

    data = { ...data, ...additionalData };

    const response = await apiFunction(data);

    let tempIdValidMsg = '';
    let tempPwdValidMsg = '';
    let tempPwd2ValidMsg = '';
    let tempNameValidMsg = '';

    let tempPhoneNumErrorMsg = '';

    if (response?.[0].username) {
      tempIdValidMsg = '필수 정보입니다.';
    } else if (!isValidCheck) {
      tempIdValidMsg = '중복확인을 해주세요.';
    } else {
      tempIdValidMsg = '';
    }

    if (response?.[0].password) {
      tempPwdValidMsg = '필수 정보입니다.';
    } else {
      tempPwdValidMsg = '';
    }

    if (response?.[0].password2) {
      tempPwd2ValidMsg = '필수 정보입니다.';
    } else {
      tempPwd2ValidMsg = '';
    }

    if (response?.[0].name) {
      tempNameValidMsg = '필수 정보입니다.';
    } else {
      tempNameValidMsg = '';
    }

    if (response?.[0].phone_number) {
      tempPhoneNumErrorMsg = response?.[0].phone_number;
    } else {
      tempPhoneNumErrorMsg = '';
    }

    setIdValidMsg(tempIdValidMsg);
    setPwdValidMsg(tempPwdValidMsg);
    setPwd2ValidMsg(tempPwd2ValidMsg);
    setNickNameValidMsg(tempNameValidMsg);

    setPhoneNumValidMsg(tempPhoneNumErrorMsg);

    if (additionalProcessing) {
      additionalProcessing(response);
    }
  };

  return {
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
  };
};

export default ValidMsg;
