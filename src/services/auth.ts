import { instance } from './instance';

// 로그인
export const loginAPI = async (userData: object) => {
  try {
    const res = await instance.post('/accounts/login/', userData);
    localStorage.setItem('token', res.data.token);
    return [res.data];
  } catch (error: unknown) {
    if (error instanceof Error) {
      const axiosError = error as any;
      if (axiosError.response) {
        return [axiosError.response.data];
      }
    }
    return null;
  }
};

// 구매자 회원가입
export const signUpBuyer = async (userData: object) => {
  try {
    const res = await instance.post('/accounts/signup/', userData);
    return [res.data];
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(userData);
      const axiosError = error as any;
      if (axiosError.response) {
        return [axiosError.response.data];
      }
    }
    return null;
  }
};

// 판매자 회원가입
export const signUpSeller = async (userData: object) => {
  try {
    const res = await instance.post('/accounts/signup_seller/', userData);
    return [res.data];
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(userData);
      const axiosError = error as any;
      if (axiosError.response) {
        console.log(axiosError.response.data);
      } else {
        console.log(error.message); // Error 인스턴스지만, 응답이 없는 경우
      }
    }
    return null;
  }
};

// 계정 검증
export const validIdAPI = async (userData: object) => {
  try {
    const res = await instance.post('/accounts/signup/valid/username/', userData);
    return [res.data];
  } catch (error: unknown) {
    if (error instanceof Error) {
      const axiosError = error as any;

      if (axiosError.response) {
        console.log(axiosError.response.data);
        return [axiosError.response.data];
      }
    }
    return null;
  }
};
