import { instance } from './instance';

export const loginAPI = async (userData: object) => {
  try {
    const res = await instance.post('/accounts/login/', userData);
    console.log(res);
    return [res.data];
  } catch (error) {
    console.log(userData);
    console.log(error);
    return null;
  }
};
