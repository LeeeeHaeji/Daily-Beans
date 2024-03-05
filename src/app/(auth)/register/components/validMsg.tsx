import { useState } from 'react';
import { validIdAPI } from '@/services/auth';
import { SignUpData } from './types';

const ValidMsg = (signUpData: SignUpData) => {
  const [idValidMsg, setIdValidMsg] = useState('');
  const [idSuccessMsg, setIdSuccessMsg] = useState('');
  const [pwdValidMsg, setPwdValidMsg] = useState('');
  const [pwd2ValidMsg, setPwd2ValidMsg] = useState('');
  const [nickNameValidMsg, setNickNameValidMsg] = useState('');
  const [initialPwdValid, setInitialPwdValid] = useState<boolean>(false);
  const [initialPwd2Valid, setInitialPwd2Valid] = useState<boolean>(false);

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
      tempIdSuccessMsg = response?.[0].Success;
    }

    setIdSuccessMsg(tempIdSuccessMsg);
    setIdValidMsg(tempIdValidMsg);
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
    console.log(validPwd2);
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

  return {
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
  };
};

export default ValidMsg;
