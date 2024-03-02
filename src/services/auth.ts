import { instance } from './instance';

// 로그인
export const loginAPI = async (userData: object) => {
  try {
    const res = await instance.post('/accounts/login/', userData);
    console.log(res);
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

// 구매자 회원가입
export const signUpBuyer = async (userData: object) => {
  try {
    const res = await instance.post('/accounts/signup/', userData);
    console.log(res);
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

// 판매자 회원가입
export const signUpSeller = async (userData: object) => {
  try {
    const res = await instance.post('/accounts/signup_seller/', userData);
    console.log(res);
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
