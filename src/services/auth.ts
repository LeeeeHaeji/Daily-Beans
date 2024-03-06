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
      const axiosError = error as any;
      if (axiosError.response) {
        return [axiosError.response.data];
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
        return [axiosError.response.data];
      }
    }
    return null;
  }
};

// 사업자 등록번호 검증
export const validCompany = async (userData: object) => {
  try {
    const res = await instance.post(
      '/accounts/signup/valid/company_registration_number/',
      userData,
    );
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
